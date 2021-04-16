(function () {

    $.get("bids", function(data) {
        if (data) {
            data.forEach((matchBids, index) => {
                let match = matchBids[0];

                var dividerHtml = `
                    <tr><td colspan="3" class="bg-secondary text-white">Match ${match}</td></tr>
                `
                $('#bids').append(dividerHtml)

                matchBids[1].forEach((bid, index) => {

                    var html = `
                        <tr>
                            <td>${bid.player}</td>
                            <td>${bid.team}</td>
                            <td>${bid.bid}</td>
                        </tr>
                    `
                     $('#bids').append(html);
                });
            });
        }
    });

})();