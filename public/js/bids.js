(function () {

    $.get("bids", function(data) {
        if (data) {
            $.each(data, function(index, bid) {
                 $('#bids').append(JSON.stringify(bid) + "<br/>");
            });
        }
    });

})();