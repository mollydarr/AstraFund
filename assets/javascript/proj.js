

$(document).ready(function () {
    var cobaltURL = "https://www.quandl.com/api/v3/datasets/LME/PR_CO?column_index=1&api_key=nf68sBZ1FqJ86q9xzvWx";
    var nickelURL = "https://www.quandl.com/api/v3/datasets/LME/PR_NI?column_index=1&api_key=nf68sBZ1FqJ86q9xzvWx";
    var platURL = "https://www.quandl.com/api/v3/datasets/LPPM/PLAT?column_index=1&api_key=nf68sBZ1FqJ86q9xzvWx";
    var ironURL = "https://www.quandl.com/api/v3/datasets/COM/FE_TJN?column_index=1&api_key=nf68sBZ1FqJ86q9xzvWx";

    var cobaltPrice;
    var dateRefreshed;
    var nickelPrice;
    var platPrice;
    var ironPrice;


    //cobalt ajax call
    $.ajax({
        url: cobaltURL,
        method: "GET",
        async: false
    })
        .done(function (response) {
            var results = response.dataset;
            //price per oz
            cobaltPrice = (((results.data[0])[1]) / 35274.62).toFixed(2);
            dateRefreshed = results.newest_available_date;
        });



    //iron ajax call
    $.ajax({
        url: ironURL,
        method: "GET",
        async: false
    })
        .done(function (response) {
            var results = response.dataset;
            //price per oz
            ironPrice = (((results.data[0])[1]) / 35274.62).toFixed(4);
        });

    //nickel ajax call
    $.ajax({
        url: nickelURL,
        method: "GET",
        async: false
    })
        .done(function (response) {
            var results = response.dataset;
            //price per oz
            nickelPrice = (((results.data[0])[1]) / 35274.62).toFixed(2);
        });


    //platinum ajax call
    $.ajax({
        url: platURL,
        method: "GET",
        async: false
    })
        .done(function (response) {
            var results = response.dataset;
            //price per oz
            platPrice = (results.data[0])[1];
        });

    //access firebase
    var database = firebase.database();

    var spectraRef = database.ref('spectraType');

    var userRef = database.ref('users');

    spectraRef.on("value", gotData, errData);

    var accessibility = [];
    var asteroidName = [];
    var sharePriceArray = [];

    //Asteroid Object
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
            "Group": "APO",
            "sharePrice": 20,
            "composition": [0, .85, .10, .05]
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
            "Group": "AMO",
            "sharePrice": 20,
            "composition": [0, .75, .15, .10]
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
            "Group": "APO",
            "sharePrice": 30,
            "composition": [0, .7, .2, .10]
        },
        {
            "name": "2011 UW158",
            "Type": "Xc",
            "a": "1.621",
            "e": "0.376",
            "value": "6.69 billion",
            "estProfit": "1.74 billion",
            "velocity": "5.189",
            "moid": "0.002225",
            "Group": "APO",
            "sharePrice": 30,
            "composition": [.02, .5, .35, .13]
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
            "Group": "APO",
            "sharePrice": 50,
            "composition": [0, .6, .30, .10]

        },
        {
            "name": "1992 TC",
            "Type": "X",
            "a": "1.566",
            "e": "0.292",
            "value": "84.01 billion",
            "estProfit": "16.78 billion",
            "velocity": "5.648",
            "moid": "0.166957",
            "Group": "AMO",
            "sharePrice": 30,
            "composition": [0, .55, .25, .20]
        },
        {
            "name": "1997 XF11",
            "Type": "Xk",
            "a": "1.443",
            "e": "0.484",
            "value": "383.99 billion",
            "estProfit": "53.00 billion",
            "velocity": "6.546",
            "moid": "0.000442",
            "Group": "APO",
            "sharePrice": 30,
            "composition": [0, .53, .22, .25]
        },
        {
            "name": "1992 BF",
            "Type": "Xc",
            "a": "0.908",
            "e": "0.272",
            "value": "2.90 billion",
            "estProfit": "357.67 million",
            "velocity": "6.982",
            "moid": "0.062638",
            "Group": "ATE",
            "sharePrice": 30,
            "composition": [.02, .6, .2, .18]
        }];

    //push properties into new arrays
    for (i = 0; i < asteroidObj.length; i++) {
        //Campodonico Accessibiility Factor (or the CAF)
        accessibility.push(asteroidObj[i].moid * asteroidObj[i].velocity * 10);
        asteroidName.push(asteroidObj[i].name);
        sharePriceArray.push(
            ((asteroidObj[i].composition[0] * platPrice * 10) + (asteroidObj[i].composition[1] * nickelPrice * 10) + (asteroidObj[i].composition[2] * ironPrice * 10) + (asteroidObj[i].composition[3] * cobaltPrice * 10)).toFixed(2)
        );

        $("#asteroidTable tr:last").after("<tr><td>" + asteroidObj[i].name +
            "</td><td>" + asteroidObj[i].value +
            "</td><td>" + asteroidObj[i].estProfit +
            "</td><td>" + accessibility[i].toFixed(3) +
            "</td><td>" + asteroidObj[i].Type +
            "</td><td>" + sharePriceArray[i] + "</td></tr>");
    }

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

    $("#mktTrend").html("Last updated: " + dateRefreshed + "<br> Nickel: " + nickelPrice + " $/oz " + "<br> Platinum: " + platPrice + " $/oz " + "<br> Iron: " + ironPrice + " $/oz " + "<br> Cobalt: " + cobaltPrice + " $/oz ");

    function errData(err) {
        console.log("error!");
        console.log(err);
    }

    //user input functionality 
    $("#userSubmit").on("click", function (e) {
        e.preventDefault();

        var userName = $("#userName-input").val().trim();

        var date = $("#date-input").val();

        var investAmt = $("#investment-input").val().trim();

        var spectra = $("#spectra").val();

        if (userName === "" || date === "" || investAmt === "" || investAmt <= 0) {
            console.log('all fields need to be filled');
        } else {
            var user = {
                userName: userName,
                date: date,
                investAmt: investAmt,
                spectra: spectra,
            };

            userRef.push(user)

            $(".table-input").val("");

            console.log(user);


            for (i = 0; i < asteroidObj.length; i++) {
                if ((asteroidObj[i].name + " (" + asteroidObj[i].Type + ")") === user.spectra) {
                    //if (asteroidObj[i].Type === user.spectra) {
                    console.log("yessir");
                    //console.log(asteroidObj[i].sharePrice);
                    console.log(sharePriceArray[i]);
                    if (user.investAmt < asteroidObj[i].sharePrice) {
                        //if (user.investAmt < sharePriceArray[i]) {

                        console.log("you do not have sufficient funds to invest in one share of this asteroid type");
                    } else {
                        //var numOfShares = Math.floor(user.investAmt / asteroidObj[i].sharePrice);
                        var numOfShares = Math.floor(user.investAmt / sharePriceArray[i]);
                        console.log(numOfShares);
                    }
                } else { }
            }
        }
    });



    // //pie chart
    // google.charts.load("current", { packages: ["corechart"] });
    // google.charts.setOnLoadCallback(drawChart);
    // function drawChart() {
    //     var data = google.visualization.arrayToDataTable([
    //         ['Task', 'Hours per Day'],
    //         ['Invest1', 11],
    //         ['Invest2', 2],
    //         ['Invest3', 2],
    //         ['Invest4', 2],
    //         ['Invest5', 7]
    //     ]);

    //     var options = {
    //         title: 'Investment',
    //         pieHole: 0.4,
    //     };

    //     var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    //     chart.draw(data, options);
    // }

    //build plotly asteroid graph
    var trace1 = {
        x: accessibility,
        y: [10, 20, 30, 40, 50, 30, 15, 25],
        text: asteroidName,
        mode: 'markers',
        marker: {
            //change marker size
            size: 10,
            //change marker color
            color: 'rgb(128, 0, 128)',
            sizemode: 'area'
        }
    };

    var data = [trace1];

    var layout = {
        title: "Available Asteroids",
        showLegend: true,
        //change graph size
        height: 400,
        width: 480,
        xaxis: {
            title: 'Accessibility Factor (CAF)',
        },
        yaxis: {
            title: 'Price per Share (USD)',
        },
        //change font
        font: {
            family: 'Lato, monospace',
            size: 18,
            color: '#7f7f7f'
        }
    };


    Plotly.newPlot('productTitle', data, layout);

    //BEGIN NEWS API CALL
    var authKey = "70bfc5198b3b423ea769653ec3efde37";
    var queryURL = "https://newsapi.org/v2/everything?q=asteroid+mining&language=en&sortBy=popularity&apiKey=" + authKey;
    var articleCounter = 0;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (newsResponse) {
        var newsResults = newsResponse.articles;

        for (var i = 0; i < 6; i++) {

            var articles = $('<div>');
            articles.addClass('panel-body');
            articles.attr('id', 'articleSection-' + i);
            $('#articles').append(articles);

            $('#articleSection-' + i).append("<h3>" + newsResults[i].title + "</3>" + "<br>");
            $('#articleSection-' + i).append("<h6>" + newsResults[i].description + "</h6>" + "<br>");
            $('#articleSection-' + i).append(newsResults[i].source.name + "<br>");
            $('#articleSection-' + i).append("Published:" + " " + newsResults[i].publishedAt + "<br>"); //add moment.js formatting to published date
            $('#articleSection-' + i).append("<a href=" + newsResults[i].url + ">" + "Read More" + "</a>" + "<br>");
            //$('#articleSection-' + i).append("<img src=" + newsResults[i].urlToImage + ">");
        }

    }); // END NEWS API CALL

});




