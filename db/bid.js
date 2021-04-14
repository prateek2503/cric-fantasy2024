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

    this.saveDefaultBid = function (bidDetails) {
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

    this.findByMatch = function(matchId, callback) {
        db.find({match_id: matchId}, function (err, bidDetails) {
            let bidDetailsMap = new Map();
            bidDetails.forEach(function (bidDetail) {
                bidDetailsMap.set(bidDetail.player, bidDetail);
            });
            callback(bidDetailsMap);
        })
    }

    this.findAllByMatch = function(matchId, callback) {
        db.find({match_id: matchId}, function (err, bidDetails) {
            callback(bidDetails);
        })
    }

    this.findAll = function(callback) {
        db.find({}).sort({ match_id: 1 }).exec(function (err, bidDetails) {
            callback(bidDetails);
        })
    }

    this.truncate = function() {
        db.remove(
            {},
            { multi: true },
            function (err, numRemoved) {}
        );
    }
}

module.exports = Bid;