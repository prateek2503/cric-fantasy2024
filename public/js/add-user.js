(function () {

    $("#create-user").click(function(event) {
        var user = $("#user-name").val();

        if (!user) {
            alert("Please enter a user name!");
            event.stopPropagation();
            return;
        }

        $("#generated").html("new user/password: " + user + "/")
    });
})();