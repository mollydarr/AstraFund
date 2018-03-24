

$(document).ready(function () {

    var database = firebase.database();

    var spectraRef = database.ref('spectraType');

    spectraRef.on("value", gotData, errData);

    var asteroidObj =
        [{
            "name": "Ryugu",
            "Type": "Cg",
            "a": "1.190",
            "e": "0.190",
            "value": "82.76 billion",
            "estProfit": "30.07 billion",
            "velocity": "4.664",
            "moid": "0.000083",
            "Group": "APO"
        },
        {
            "name": "1989 ML",
            "Type": "X",
            "a": "1.272",
            "e": "0.137",
            "value": "13.94 billion",
            "estProfit": "4.38 billion",
            "velocity": "4.889",
            "moid": "0.082029",
            "Group": "AMO"
        },
        {
            "name": "Nereus",
            "Type": "Xe",
            "a": "1.489",
            "e": "0.360",
            "value": "4.71 billion",
            "estProfit": "1.39 billion",
            "velocity": "4.985",
            "moid": "0.003260",
            "Group": "APO"
        },
        {
            "name": "Bennu",
            "Type": "B",
            "a": "1.126",
            "e": "0.204",
            "value": "669.96 million",
            "estProfit": "185.00 million",
            "velocity": "5.096",
            "moid": "0.003223",
            "Group": "APO"
        },
        {
            "name": "Didymos",
            "Type": "Xk",
            "a": "1.644",
            "e": "0.384",
            "value": "62.25 billion",
            "estProfit": "16.41 billion",
            "velocity": "5.162",
            "moid": "0.039291",
            "Group": "APO"
        }];

    
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



    //on functions for firebase
    function gotData(snapshot) {

        $("#spectra").empty();

        var spectra = snapshot.val();
        console.log(spectra);
        var keys = Object.keys(spectra);
        console.log(keys);

        for (i = 0; i < keys.length; i++) {
            console.log(keys[i]);

            $("#spectra").append("<option>" + keys[i])

        };

    };

    function errData(err) {
        console.log("error!");
        console.log(err);
    }

    $("#userSubmit").on("click",function(e){
        e.preventDefault();

        var userName = $("#userName-input").val().trim();

        var date = $("#date-input").val();

        var investAmt = $("#investment-input").val().trim();

        var spectra = $("#spectra").val();

        console.log(userName);
        console.log(date);
        console.log(investAmt);
        console.log(spectra);
    });

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
});