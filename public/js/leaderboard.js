(function () {

    $.get("leaders", function(data) {
        if (data) {
            $.each(data, function(index, player) {
                 $('#leaders').append("<p>" + player.name + ": "  + player.point + "</p>");
            });
        }
    });

})();