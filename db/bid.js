let Datastore = require('nedb')

function Bid() {
    let db = new Datastore({ filename: './data/bid_details.db', autoload: true });

    this.store = function (bidDetails) {
        db.update(
            { player: bidDetails.player, match_id: bidDetails.match_id },
            bidDetails,
            { upsert: true },
            function (err, numReplaced) {}
        );
    }

    this.get = function(playerName, callback) {
        db.find({ player: playerName }, function (err, bidDetails) {
            let bidDetailsMap = new Map();
            bidDetails.forEach(function (bidDetail) {
                bidDetailsMap.set(bidDetail.match_id, bidDetail);
            });
            callback(bidDetailsMap);
        })
    }
}

module.exports = Bid;