let Datastore = require('nedb')

function Player() {
    let db = new Datastore({ filename: './data/players.db', autoload: true });

    this.store = function (player) {
        db.update(
            { name: player.name },
            { $set: { code: player.code } },
            {},
            function (err, numUpdated) {
                if (numUpdated == 0) {
                    player.point = 0;
                    db.insert(player);
                }
            }
        );
    }

    this.find = function(playerName, callback) {
        db.find({ name : playerName}, function (err, docs) {
            callback(docs);
        })
    }

    this.findByCode = function(code, callback) {
        db.findOne({ code : code}, function (err, docs) {
            callback(docs);
        })
    }

    this.getAll = function(callback) {
        db.find({}, function (err, docs) {
            callback(docs);
        })
    }

    this.getAllSorted = function(callback) {
        db.find({}).sort({ point: -1 }).exec(function (err, docs) {
            callback(docs);
        })
    }

    this.updatePoints = function(playerName, points) {
        db.update(
            { name: playerName },
            { $set: { point: points } },
            {},
            function (err, numReplaced) {}
        );
    }

    this.reset = function() {
        db.update(
            {},
            { $set: { point: 0 } },
            { multi: true },
            function (err, numReplaced) {}
        );
    }
}

module.exports = Player;
