const express = require("express");
const app = express();

app.get("/", function (req, res) {
    res.redirect("home.html");
});

app.post("/bid", function (req, res) {
    const biddingDetails = {id: JSON.parse(req.body.id), name: JSON.parse(req.body.name), point: JSON.parse(req.body.point), team: JSON.parse(req.body.team)};


});



app.get("/calculatePoints", function pointCalculator(req, res) {
    const winner = req.body.winner;

    // calculatePoint(winner);
});

app.get("/matchList", function (req, res) {
    res.send(JSON.stringify("Match List"))
})
app.use(express.static("./public"));
module.exports = app;