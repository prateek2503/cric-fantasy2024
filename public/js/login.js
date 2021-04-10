(function () {
    $("#login").click(function(event) {
        var user = $("#user").val();

        if (!user) {
            alert("Pehchan batao bhai!");
            event.stopPropagation();
            return;
        }

        Cookies.set('user', user);
    });
})();