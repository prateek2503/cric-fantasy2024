(function () {

    $.get("leaders", function(data) {
        if (data) {
            $.each(data, function(index, player) {
                 $('#leaders').append("<tr><td>" + (index + 1) + "</td><td>" + player.name
                    + "</td><td>" + parseFloat(player.point).toFixed(2) + "</td></tr>");
            });
        }
    });

})();