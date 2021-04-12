let Datastore = require('nedb')

function Result() {
    let bid_db = new Datastore({filename: './data/bid_details.db', autoload: true});
    let players_db = new Datastore({filename: './data/players.db', autoload: true});

    this.calculate = function (req) {

        // updateBidTable(req);

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
                let point = looser.balance -looser.bid;
                pointsDistribution.push({"name": looser.player_name, "point": point})
            })
            pointsDistribution.forEach(function (eachBidder) {
                players_db.update({name: eachBidder.name}, {name: eachBidder.name, point: eachBidder.point})

            })
        })
    }

    let updateBidTable = function (req) {

    }
}

module.exports = Result;