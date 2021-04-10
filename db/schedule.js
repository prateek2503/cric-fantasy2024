let Datastore = require('nedb')

function Schedule() {
    let db = new Datastore({ filename: './data/schedule.db', autoload: true });

    this.store = function (fixture) {
        db.insert(fixture)
    }

    this.getAll = function(callback) {
        db.find({}, function (err, fixture) {
            callback(fixture);
        })
    }
}

module.exports = Schedule;