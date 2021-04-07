const express = require("express");
const app = express();

app.get("/", function (req, res) {
    res.redirect("home.html");
});

app.post("/bid");

app.use(express.static("./public"));
module.exports = app;