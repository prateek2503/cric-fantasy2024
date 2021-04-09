let Datastore = require('nedb')

function Bid() {
    let db = new Datastore({ filename: './data/bid_details.db', autoload: true });
    let player_db = new Datastore({ filename: './data/players.db', autoload: true });

    this.store = function (bidDetails) {
        player_db.find({name: bidDetails.player_name}, function (err, docs) {
            let pointBalance = docs[0].point
            bidDetails.balance = pointBalance
            db.insert(bidDetails)
        })
    }
}

module.exports = Bid;