$(document).ready(function () {
    var userInput = '\"T\"';

    var query = '{"spec":' + userInput + '}';

    var limit = "6";

    var url = 'http://www.asterank.com/api/asterank?query=' + query + '&limit=' + limit;

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
        y: [7, 8, 9, 10],
        text: ['Asteroid1', 'Asteroid2', 'Asteroid3', 'Asteroid4'],
        mode: 'markers',
        marker: {
            size: [100, 250, 500, 1000],
            sizemode: 'area'
        }
    };

    var trace2 = {
        x: [1, 2, 3, 4],
        y: [9, 10, 12, 15],
        text: ['Asteroid1', 'Asteroid2', 'Asteroid3', 'Asteroid4'],
        mode: 'markers',
        marker: {
            size: [100, 250, 500, 1000],
            sizemode: 'area'
        }
    };
    


    var data = [trace1, trace2];

    var layout = {
        title: "THIS IS A PLACEHOLDER CHART",
        showLegend: true,
        height: 400,
        width: 480,
        xaxis: {
            title: 'Price per Share',
        },
        yaxis: {
            title: 'Estimated Profit',
        }
    };


Plotly.newPlot('productTitle', data, layout);

});