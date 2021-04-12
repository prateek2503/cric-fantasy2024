let Datastore = require('nedb')

function Player() {
    let db = new Datastore({ filename: './data/players.db', autoload: true });

    this.store = function (player) {
        db.insert(player)
    }

    this.find = function(playerName, callback) {
        db.find({ name : playerName}, function (err, docs) {
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
}

module.exports = Player;