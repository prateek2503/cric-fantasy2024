const express = require("express");
let Datastore = require('nedb')
let fs = require('fs')

const Converter = require("./converter")
const Bid = require("../db/bid")
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

app.get("/calculatePoints", function pointCalculator(req, res) {
    const winner = req.body.winner;

    // calculatePoint(winner);
});
app.use(express.static("./public"));
module.exports = app;