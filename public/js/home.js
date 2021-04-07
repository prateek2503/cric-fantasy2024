(function () {
    const matchSelections =
        [
            {
                "id": 1,
                "home": "MI",
                "away": "PK",
                "date": "9th April 7:30 PM",
                "selection": "home",
                "bid": 25
            },
            {
                "id": 2,
                "home": "RCB",
                "away": "SRH",
                "date": "10th April 7:30 PM"
            }
        ];

    matchSelections.forEach(function(match) {

        var html = `
<div class="container">
    <span>
        Match ${match.id}
    </span>
    <span>
        ${match.date}
    </span>
    <div>
        <input type="radio" class="btn-check" name="options-outlined-${match.id}" id="home-outlined-${match.id}" autocomplete="off">
        <label class="btn btn-outline-success" for="home-outlined-${match.id}">${match.home}</label>

        <input type="radio" class="btn-check" name="options-outlined-${match.id}" id="away-outlined-${match.id}" autocomplete="off">
        <label class="btn btn-outline-success" for="away-outlined-${match.id}">${match.away}</label>
    </div>
</div>
        `

        $("#matches").append(html);
    });
})();