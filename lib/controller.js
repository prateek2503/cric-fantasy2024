const express = require("express");
let Datastore = require('nedb')
let fs = require('fs')
const cookieParser = require("cookie-parser");

const Bid = require("../db/bid")
const Result = require("../db/result")
const Player = require("../db/player")
const Schedule = require("../db/schedule")

let playerDb = new Player();
let scheduleDb = new Schedule();
let bidDb = new Bid();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", function (req, res) {
    res.redirect("login.html");
});

app.get("/matchList", function (req, res) {
    scheduleDb.getAll(function (schedule) {
        res.send(schedule);
    });
})

app.get("/matchListSelections", function (req, res) {
    let user = req.cookies.user;
    bidDb.get(user, function (bidDetails) {
        scheduleDb.getAll(function (schedule) {
            let scheduleArray = [];

            schedule.forEach(function(fixture) {
                let bidDetail = bidDetails.get(fixture.id);

                if (bidDetail) {
                    fixture.selection = bidDetail.team;
                    fixture.bid = bidDetail.bid;
                }

                scheduleArray.push(fixture);
            });

            res.send(scheduleArray);
        });
    });
})

app.post("/bid", function (req, res) {
    let user = req.cookies.user;
    let reqBody = req.body;

    reqBody.player = user;

    let bid = bidDb.store(reqBody);
    res.send("200")
});

app.get("/bids", function (req, res) {
    scheduleDb.getAll(fixtures => {
        let eligibleMatches = [];
        fixtures.every(fixture => {
            var startTime = Date.parse(fixture.date + ' GMT+0530');

            if (startTime > Date.now()) {
                let matchBids = [];
                eligibleMatches.forEach((match, index, array) => {
                    bidDb.findAllByMatch(match.id, bids => {
                        let bidList = [];
                        bids.forEach(bid => {
                            bid.team = (bid.team == 'home') ? match.home : match.away;
                            bidList.push(bid);
                        });

                        if (bidList.length > 0) {
                            matchBids.push([match.id, bidList]);
                        }

                        if (index === array.length - 1) {
                            res.send(matchBids);
                        }
                    });
                });

                return false;
            }

            eligibleMatches.push(fixture);

            return true;
        });
    });
});

app.post("/player", function (req, res) {
    let reqBody = req.body;
    let player = playerDb.store(reqBody);
    res.send("200")
});

app.get("/player", function (req, res) {
    playerDb.getAll(function (players) {
        res.send(players);
    });
});

app.get("/leaders", function (req, res) {
    playerDb.getAllSorted(function (players) {
        res.send(players);
    });
});

app.post("/result", function (req, res) {
    const reqBody = req.body;

    scheduleDb.get(reqBody.id, function(fixture) {
        if (fixture[0].result && fixture[0].result !== '') {
            res.status(200).send("Can't change result");
            return;
        }

        scheduleDb.updateResult(reqBody);

        new Result(bidDb, playerDb).calculate(reqBody);
        res.status(200).send("Success");
    });
});

app.get("/reset", function (req, res) {
    playerDb.reset();
    scheduleDb.reset();
    bidDb.truncate();

    res.sendStatus(200);
});

app.use(express.static("./public"));
module.exports = app;