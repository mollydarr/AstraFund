$(document).ready(function () {
    var userInput = "T";

    var query = "{'spec':" + userInput + "}";

    var limit = "1";

    var url = "http://asterank.com/api/asterank?query=" + query + "&limit=" + limit;


    $.ajax({
        url: url,
        method: "GET",
    }).then(function (response) {

        console.log(response);

    });

});