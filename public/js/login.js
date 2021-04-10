(function () {

    $.get("player", function(data) {
        if (data) {
            $.each(data, function(index, player) {
                 $('#user').append(new Option(player.name, player.name));
            });
        }
    });

    $("#login").click(function(event) {
        var user = $("#user").val();

        if (!user) {
            alert("Pehchan batao bhai!");
            event.stopPropagation();
            return;
        }

        Cookies.set('user', user, { expires: 7 });
    });
})();