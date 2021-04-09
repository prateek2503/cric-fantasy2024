let Datastore = require('nedb')

function Player() {
    let db = new Datastore({ filename: './data/players.db', autoload: true });

    this.store = function (player) {
        db.insert(player)
    }
}

module.exports = Player;