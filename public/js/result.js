(function () {
    $.get("matchList", function(matchList) {
        if (matchList) {
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
            $("#teams-" + match.id + " :input").prop('disabled', true);
            $("#submit-" + match.id).prop('disabled', true);
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
            $.ajax({
                type: 'POST',
                url: '/result',
                data: JSON.stringify(result),
                success: function(data) {
                    alert(data)
                },
                contentType: "application/json"
            });
        });
            });
        }
    });
})();