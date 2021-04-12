let _ = require('lodash')
let Datastore = require('nedb')

function Result(bidDb, playersDb) {

    this.calculate = function (req) {
        updateBidTable(req);

        bidDb.findAllByMatch(req.id, function (bids) {
            let winnerList = bids.filter(eachBid => eachBid.team == req.team)
            let loserList = bids.filter(eachBid => eachBid.team != req.team)

            let winnerTotalPoint = 0;
            let loserTotalPoint = 0;
            winnerList.forEach(function (winner) {
                winnerTotalPoint += parseInt(winner.bid)
            });
            loserList.forEach(function (loser) {
                loserTotalPoint += parseInt(loser.bid)
            });

            winnerList.forEach(function (winner) {
                playersDb.find(winner.player, function(players) {
                    if (players && players.length > 0) {
                        let winnings = ((parseInt(winner.bid) * loserTotalPoint) / winnerTotalPoint);
                        let point = parseFloat(players[0].point) + winnings;
                        playersDb.updatePoints(winner.player, point);
                    }
                });
            })

            loserList.forEach(function (loser) {
                playersDb.find(loser.player, function(players) {
                    if (players && players.length > 0) {
                        let point = parseFloat(players[0].point) - parseInt(loser.bid);
                        playersDb.updatePoints(loser.player, point);
                    }
                });
            })
        })
    }

    let updateBidTable = function (req) {
        let loosingTeam = req.team == 'home' ? 'away' : 'home';

        bidDb.findByMatch(req.id, function (bidMap) {
            playersDb.getAll(function (allPlayers) {
                if (bidMap.size != allPlayers.length) {
                    allPlayers.forEach(function (eachPlayer) {
                        if (!bidMap.get(eachPlayer.name)) {
                            let defaultBid = {
                                "match_id": req.id,
                                "team": loosingTeam,
                                "bid": "25",
                                "player": eachPlayer.name
                            }

                            bidDb.saveDefaultBid(defaultBid);
                        }
                    })
                }
            });
        });
    }
}

module.exports = Result;