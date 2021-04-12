let _ = require('lodash')
let Datastore = require('nedb')
const Player = require("../db/player")

function Result() {
    let bid_db = new Datastore({filename: './data/bid_details.db', autoload: true});
    let players_db = new Datastore({filename: './data/players.db', autoload: true});
    let schedule_db = new Datastore({filename: './data/schedule.db', autoload: true});

    let player = new Player();

    this.calculate = function (req) {
        updateBidTable(req);

        bid_db.find({"match_id": req.match_id}, function (err, docs) {
            let pointsDistribution = [];
            let winnerList = docs.filter(eachBid => eachBid.bid_on == req.winner)
            let looserList = docs.filter(eachBid => eachBid.bid_on != req.winner)

            let winnerTotalPoint = 0;
            let lostPoint = 0;
            winnerList.forEach(function (winner) {
                winnerTotalPoint += winner.bid
            });
            looserList.forEach(function (looser) {
                lostPoint += looser.bid
            });
            winnerList.forEach(function (winner) {
                let point = winner.balance + ((winner.bid * lostPoint) / winnerTotalPoint)

                pointsDistribution.push({"name": winner.player_name, "point": point})
            })

            looserList.forEach(function (looser) {
                let point = looser.balance - looser.bid;
                pointsDistribution.push({"name": looser.player_name, "point": point})
            })
            pointsDistribution.forEach(function (eachBidder) {
                players_db.update({name: eachBidder.name}, {$set: {name: eachBidder.name, point: eachBidder.point}})
            })
        })
    }

    let updateBidTable = function (req) {
        schedule_db.find({id: req.match_id}, function (err, docs) {
            let loosingTeam = docs[0].result == 'home' ? 'away' : 'home';

            bid_db.find({match_id: req.match_id}, function (err, bidders) {
                players_db.find({}, function (err, allPlayers) {
                    if (bidders.length != allPlayers.length) {
                        allPlayers.forEach(function (eachPlayer) {
                            if (_.findIndex(bidders, {name: eachPlayer.name}) < 0) {
                                let defaultBid = {
                                    "match_id": req.match_id,
                                    "team": loosingTeam,
                                    "bid": "25",
                                    "player": eachPlayer.name
                                }

                                bid_db.insert(defaultBid)
                            }
                        })

                    }
                })
            })
        })
    }
}

module.exports = Result;