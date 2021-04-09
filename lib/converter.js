let csvToJson = require('convert-csv-to-json');

function Converter() {
    let fileInputName = 'data/ipl-2021-IndiaStandardTime.csv';

    this.convert = function () {
        let json = csvToJson.getJsonFromCsv(fileInputName);
        return json;
    }
}

module.exports = Converter;