let Datastore = require('nedb')

function Bid() {
    let db = new Datastore({ filename: './data/bid_details.db', autoload: true });

    this.store = function (bidDetails) {
        db.insert(bidDetails)
        // db.find({"player_id": bidDetails.player_id, "match_id": bidDetails.match_id}, function (err, docs) {
        //     if(docs.length == 0) {
        //         db.insert(bidDetails)
        //     } else {
        //         db.update(
        //             {"player_id": bidDetails.player_id, "match_id": bidDetails.match_id},
        //             {"player_id": bidDetails.player_id, "match_id": bidDetails.match_id, "date": bidDetails.date, "bid_on": bidDetails.bid_on, "point": bidDetails.point},
        //             {}, function (err, numReplaced) {
        //             console.log("Num replaced : ", numReplaced)
        //         })
        //     }
        // })
    }
}

module.exports = Bid;