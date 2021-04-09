let Datastore = require('nedb')

function Match() {
    let db = new Datastore({filename: './data/match_details.db', autoload: true});

    this.findAll = function (fn) {
        db.find({}, function (err, docs) {
            fn(docs);
        })
    }
}

module.exports = Match;