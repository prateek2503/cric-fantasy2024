const express = require("express");
let Datastore = require('nedb')
let fs = require('fs')

const Bid = require("../db/bid")
const Result = require("../db/result")
const Player = require("../db/player")

    let player_db = new Datastore({ filename: './data/players.db', autoload: true });

const app = express();
app.use(express.json());

app.get("/", function (req, res) {
    res.redirect("home.html");
});

app.get("/matchList", function (req, res) {
    let matchList = ''
    try {
        const jsonString = fs.readFileSync('./data/schedule.json')
        matchList = JSON.parse(jsonString)
    } catch (err) {
        console.log(err)
        return
    }
    res.send(matchList)
})

app.post("/bid", function (req, res) {
    let reqBody = req.body;
    let bid = new Bid().store(reqBody);
    res.send("200")
});

app.post("/player", function (req, res) {
    let reqBody = req.body;
    let player = new Player().store(reqBody);
    res.send("200")
});

app.get("/player", function (req, res) {
    player_db.find({}, function (err, docs) {
        res.send(docs)
    })
});

app.post("/result", function (req, res) {
    const reqBody = req.body;

    let calculate = new Result().calculate(reqBody);
    res.send("200")
});
app.use(express.static("./public"));
module.exports = app;