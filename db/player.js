let Datastore = require('nedb')

function Player() {
    let db = new Datastore({ filename: './data/players.db', autoload: true });

    this.store = function (player) {
        db.insert(player)
    }

    this.getAll = function(callback) {
        db.find({}, function (err, docs) {
            callback(docs);
        })
    }
}

module.exports = Player;