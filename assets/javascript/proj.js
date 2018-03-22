$(document).ready(function () {
    var userInput = '\"T\"';

    var query = '{"spec":' + userInput + '}';

    var limit = "6";

    var url = 'http://www.asterank.com/api/asterank?query=' + query + '&limit=' + limit;

    console.log(url);
    $.ajax({
        url: url,
        method: "GET",
    }).then(function (response) {

        console.log(response);

    });

});