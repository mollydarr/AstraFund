$(document).ready(function () {
    var userInput = "T";

    var query = "{'spec':" + userInput + "}";

    var limit = "1";

    var url = "https://asterank.com/api/asterank?query=" + query + "&limit=" + limit;

    console.log("testing a branch");
    console.log(url);
    $.ajax({
        url: url,
        method: "GET",
    }).then(function (response) {

        console.log(response);

    });

    //build placeholder 
    var trace1 = {
        x: [1, 2, 3, 4],
        y: [12, 11, 12, 13],
        text: ['A<br>size:40', 'B<br>size:60', 'C<br>size: 80', 'D<br>size: 100'],
        mode:'markers',
        marker: {
            size: [400, 600, 800, 1000],
            sizemode: 'area'
        }
    };

    var trace2 = {
        x: [1, 2, 3, 4],
        y: [14, 15, 16, 17],
        text: ['A<br>size:40</br>sixeref: 0.2', 'B<br>size:60</br>sixeref: 0.2', 'C<br>size: 80</br>sixeref: 0.2', 'D<br>size: 100</br>sixeref: 0.2'],
        mode:'markers',
        marker: {
            size: [400, 600, 800, 1000],
            sizeref: 2,
            sizemode: 'area'
        }
    };

     var trace3 = {
        x: [1, 2, 3, 4],
        y: [20, 21, 22, 23],
        text: ['A<br>size:40</br>sixeref: 2', 'B<br>size:60</br>sixeref: 2', 'C<br>size: 80</br>sixeref: 2', 'D<br>size: 100</br>sixeref: 2'],
        mode:'markers',
        marker: {
            size: [400, 600, 800, 1000],
            sizeref: 0.2,
            sizemode: 'area'
        }
    };

    var data = [trace1, trace2, trace3];

    var layout = {
        title: "THIS IS A PLACEHOLDER CHART",
        showLegend: true,
        height: 400,
        width:480
    };

    Plotly.newPlot('productTitle', data, layout);

});