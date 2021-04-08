(function () {
    const matchSelections =
        [
            {
                "id": 1,
                "home": "MI",
                "away": "PK",
                "date": "2021-04-08T19:30:00.000",
                "result": "home"
            },
            {
                "id": 2,
                "home": "RCB",
                "away": "SRH",
                "date": "2021-04-10T19:30:00.000"
            }
        ];

    matchSelections.forEach(function(match) {

        var startTime = Date.parse(match.date);

        var html = `
    <div class="row border rounded pb-4">
        <div class="row py-4">
            <div class="col-8">
                Match ${match.id} ${match.home} vs ${match.away}
            </div>
            <div class="col-4 text-end">
                ${moment(startTime).format("Do MMM, h:mm A")}
            </div>
        </div>
        <div class="row">
            <div class="d-grid gap-2 col-6" id="teams-${match.id}">
                <input type="radio" class="btn-check" name="team-result-${match.id}" id="home-${match.id}"
                       value="home" autocomplete="off">
                <label class="btn btn-outline-success" for="home-${match.id}">${match.home}</label>

                <input type="radio" class="btn-check" name="team-result-${match.id}" id="away-${match.id}"
                       value="away" autocomplete="off">
                <label class="btn btn-outline-success" for="away-${match.id}">${match.away}</label>
            </div>
            <div class="d-grid gap-2 col-6 text-end">
                <div class="float-end">
                    <button type="submit" id="submit-${match.id}" class="btn btn-primary">Submit result</button>
                </div>
            </div>
        </div>
    </div>
        `

        $("#results").append(html);

        if (match.result) {
            $("#" + match.result + "-" + match.id).prop('checked', true);
        }

        $("#submit-" +  match.id).click(function(event) {
            var result = {};
            result.id = match.id;
            result.team = $("input[name=team-result-" + match.id + "]:checked").val();

            if (!result.team) {
                alert("Please select a team!");
                event.stopPropagation();
                return;
            }
            console.log(result);
        });
    });
})();