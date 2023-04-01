let _ = require('lodash')
let Datastore = require('nedb')

function Result(bidDb, playersDb) {

    this.calculate = function (req) {
        saveDefaultBids(req, function () {
            calculatePoints(req);
        });
    }

    let calculatePoints = function (req) {
        bidDb.findAllByMatch(req.id, function (bids) {
            let winnerList = bids.filter(eachBid => eachBid.team == req.team)
            let loserList = bids.filter(eachBid => eachBid.team != req.team)

            let winnerTotalPoint = 0;
            let loserTotalPoint = 0;
			let loserBid =0;
			let winnerBid =0;
            winnerList.forEach(function (winner) {
                winnerTotalPoint += parseInt(winner.bid)
            });
            loserList.forEach(function (loser) {
                loserTotalPoint += parseInt(loser.bid)
            });

            winnerList.forEach(function (winner) {
                playersDb.find(winner.player, function(players) {
                    if (players && players.length > 0) {
                        winnerBid = parseInt(winner.bid);
						winnerBid = winnerBid * 1;
                        let winnings = ((winnerBid * loserTotalPoint) / winnerTotalPoint);
                        let point = parseFloat(players[0].point) + winnerBid + parseFloat(winnings);
                        playersDb.updatePoints(winner.player, point);
                    }
                });
            })

            loserList.forEach(function (loser) {

                playersDb.find(loser.player, function(players) {

					
                    if (players && players.length > 0 ) {
						loserBid = parseInt(loser.bid);
						if (loserBid === 150 || loserBid === 200 || loserBid === 100){
						loserBid = loserBid * 1.2;
						
						}
                        let point = parseFloat(players[0].point) - parseFloat(loserBid);
                        playersDb.updatePoints(loser.player, point);
                    }
                });
            })
        })
    }

    let saveDefaultBids = function (req, callback) {
        let loosingTeam = req.team == 'home' ? 'away' : 'home';

        bidDb.findByMatch(req.id, function (bidMap) {
            playersDb.getAll(function (allPlayers) {
                if (bidMap.size != allPlayers.length) {
                    allPlayers.forEach(function (eachPlayer) {
                        if (!bidMap.get(eachPlayer.name)) {
                            let defaultBid = {
                                "match_id": req.id,
                                "team": loosingTeam,
                                "bid": "200",
                                "player": eachPlayer.name
                            }

                            bidDb.saveDefaultBid(defaultBid);
                        }
                    })
                }

                callback();
            });
        });
    }
}

module.exports = Result;
