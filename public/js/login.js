(function () {

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    if (params.unknownIdentity !== null) {
        $("#unknownIdentity").show();
    } else {
        $("#unknownIdentity").hide();
    }

    $("#login").click(function(event) {
        var code = $("#code").val();

        if (!code) {
            alert("Pehchan batao bhai!");
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        Cookies.set('code', code, { expires: 7 });
    });
})();