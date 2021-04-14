(function () {

    $.get("leaders", function(data) {
        if (data) {
            $.each(data, function(index, player) {
                 $('#leaders').append("<p>" + player.name + ": "  + player.point + "</p>");
            });
        }
    });

    $.get("bids", function(data) {
        if (data) {
            $.each(data, function(index, bid) {
                 $('#bids').append(JSON.stringify(bid) + "<br/>");
            });
        }
    });

})();