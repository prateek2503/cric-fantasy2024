(function () {
    var matchSelections =
    [
      {
        "id": 1,
        "home": "MI",
        "away": "PK",
        "date": "9th April 7:30 PM",
        "selection": "home",
        "bid": 100
      },
      {
        "id": 2,
        "home": "RCB",
        "away": "SRH",
        "date": "10th April 7:30 PM"
      }
    ]

    matchSelections.forEach(function(match) {

        var html = `
    <div class="row border rounded pb-4">
        <div class="row py-4">
            <div class="col-8">
                Match ${match.id} ${match.home} vs ${match.away}
            </div>
            <div class="col-4 text-end">
                ${match.date}
            </div>
        </div>
        <div class="row">
            <div class="d-grid gap-2 col-6">
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

        if (match.bid) {
            $("#bid-select-" + match.id).val(match.bid);
        }

        if (match.selection) {
            $("#" + match.selection + "-" + match.id).prop('checked', true);
        }

        $("#submit-" +  match.id).click(function(event) {
            var bidSelection = {};
            bidSelection.id = match.id;
            bidSelection.team = $("input[name=team-selection-" + match.id + "]:checked").val();
            bidSelection.bid = $("#bid-select-" + match.id).val();

            if (!bidSelection.team) {
                alert("Please select a team!");
                event.stopPropagation();
                return;
            }
            console.log(bidSelection);
        });
    });
})();