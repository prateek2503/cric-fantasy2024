(function () {
    var user = Cookies.get('user');
    if (!user) {
        window.location = "/login.html";
    }

    $("#user-welcome").text(user);

    $.get("matchListSelections", function(matchList) {
        if (!matchList) {
            return;
        }

        $.each(matchList, function(index, match) {
            var startTime = Date.parse(match.date);

            var html = `
        <div class="row border rounded pb-4">
            <div class="row py-4">
                <div class="col-8">
                    <h5><b>Match ${match.id}</b> ${match.home} vs ${match.away}</h5>
                    <small class="text-muted">at ${match.venue}</small>
                </div>
                <div class="col-4 text-end">
                    ${moment(startTime).format("Do MMM, h:mm A")}
                </div>
            </div>
            <div class="row">
                <div class="d-grid gap-2 col-6" id="teams-${match.id}">
                    <input type="radio" class="btn-check" name="team-selection-${match.id}" id="home-${match.id}"
                           value="home" autocomplete="off">
                    <label class="btn btn-outline-success" for="home-${match.id}">${match.home}</label>

                    <input type="radio" class="btn-check" name="team-selection-${match.id}" id="away-${match.id}"
                           value="away" autocomplete="off">
                    <label class="btn btn-outline-success" for="away-${match.id}">${match.away}</label>
                </div>
                <div class="d-grid gap-2 col-6 text-end">
                    <div class="input-group">
                        <label class="input-group-text" for="bid-select-${match.id}">Bid</label>
                        <select class="form-select" id="bid-select-${match.id}">
                            <option value="25" selected>25</option>
                            <option value="50">50</option>
                            <option value="75">75</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div class="float-end">
                        <button type="submit" id="submit-${match.id}" class="btn btn-primary">Submit bid</button>
                    </div>
                </div>
            </div>
        </div>
            `

            $("#matches").append(html);

            if (startTime < Date.now()) {
                $("#teams-" + match.id + " :input").prop('disabled', true);
                $("#bid-select-" + match.id).prop('disabled', true);
                $("#submit-" + match.id).prop('disabled', true);
            }

            if (match.bid) {
                $("#bid-select-" + match.id).val(match.bid);
            }

            if (match.selection) {
                $("#" + match.selection + "-" + match.id).prop('checked', true);
            }

            $("#submit-" +  match.id).click(function(event) {
                var bidSelection = {};
                bidSelection.match_id = match.id;
                bidSelection.team = $("input[name=team-selection-" + match.id + "]:checked").val();
                bidSelection.bid = $("#bid-select-" + match.id).val();

                if (!bidSelection.team) {
                    alert("Kaunsa team hona?");
                    event.stopPropagation();
                    return;
                }

                $.ajax({
                    type: 'POST',
                    url: '/bid',
                    data: JSON.stringify(bidSelection),
                    success: function(data) {
                        alert("Bid submit ho gaya. Inshallah! jeet tumhari ho.")
                    },
                    contentType: "application/json",
                    dataType: 'json'
                });
            });
        });
    });
})();