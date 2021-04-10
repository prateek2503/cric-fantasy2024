const express = require("express");
let Datastore = require('nedb')
let fs = require('fs')

const Bid = require("../db/bid")
const Result = require("../db/result")
const Player = require("../db/player")
const Schedule = require("../db/schedule")

let playerDb = new Player();
let scheduleDb = new Schedule();

const app = express();
app.use(express.json());

app.get("/", function (req, res) {
    res.redirect("login.html");
});

app.get("/matchList", function (req, res) {
    scheduleDb.getAll(function (schedule) {
        res.send(schedule);
    });
//    let matchList = ''
//    try {
//        const jsonString = fs.readFileSync('./data/schedule.json')
//        matchList = JSON.parse(jsonString)
//
//        matchList.forEach(function(match) {
//            scheduleDb.store(match);
//        });
//    } catch (err) {
//        console.log(err)
//        return
//    }
//    res.send(matchList)
})

app.post("/bid", function (req, res) {
    let reqBody = req.body;
    let bid = new Bid().store(reqBody);
    res.send("200")
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

app.post("/result", function (req, res) {
    const reqBody = req.body;

    let calculate = new Result().calculate(reqBody);
    res.send("200")
});
app.use(express.static("./public"));
module.exports = app;