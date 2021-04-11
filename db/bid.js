let Datastore = require('nedb')

function Bid() {
    let db = new Datastore({ filename: './data/bid_details.db', autoload: true });

    this.store = function (bidDetails) {
        db.insert(bidDetails);
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