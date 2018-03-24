

$(document).ready(function () {
    var userInput = "\'T\'"; //= $("#asteroid-input").val();

    var query = '{"spec":' + userInput + '}';

    var limit = "5";

    var url = 'http://www.asterank.com/api/asterank?query=' + query + '&limit=' + limit;

    var database = firebase.database();

    var spectraRef = database.ref('spectraType');

    spectraRef.on("value", gotData, errData);

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

//on functions for firebase
function gotData(snapshot) {

    $("#tableBody").empty();

    var spectra = snapshot.val();
    console.log(spectra);
    var keys = Object.keys(spectra);
    console.log(keys);

};

function errData(err) {
    console.log("error!");
    console.log(err);
}

/*pie chart*/
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Invest1', 11],
        ['Invest2', 2],
        ['Invest3', 2],
        ['Invest4', 2],
        ['Invest5', 7]
    ]);

    var options = {
        title: 'Investment',
        pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
}