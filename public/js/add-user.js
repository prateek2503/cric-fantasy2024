(function () {

    $("#create-user").click(function(event) {
        var user = $("#user-name").val();

        if (!user) {
            alert("Please enter a user name!");
            event.stopPropagation();
            return;
        }

        var player = {};
        player.name = user;

        $.ajax({
            type: 'POST',
            url: '/player/',
            data: JSON.stringify(player),
            success: function(data) {
                $("#generated").html("new user " + user + " created")
            },
            contentType: "application/json",
            dataType: 'json'
        });
    });
})();