let Datastore = require('nedb')

function Schedule() {
    let db = new Datastore({ filename: './data/schedule-t20-wc-2021.db', autoload: true });

    this.store = function (fixture) {
        db.insert(fixture)
    }

    this.updateResult = function (result) {
        db.update(
            { _id: result.id },
            { $set: { result: result.team } },
            {},
            function (err, numReplaced) {}
        );
    }

    this.get = function(matchId, callback) {
        db.find({ _id: matchId }, function (err, fixture) {
            callback(fixture);
        })
    }

    this.getAll = function(callback) {
        db.find({}, function (err, fixture) {
            callback(fixture);
        })
    }

    this.reset = function() {
        db.update(
            {},
            { $set: { result: '' } },
            { multi: true },
            function (err, numReplaced) {}
        );
    }
}

module.exports = Schedule;
