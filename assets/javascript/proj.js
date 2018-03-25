

$(document).ready(function () {
    var cobaltURL = "https://www.quandl.com/api/v3/datasets/LME/PR_CO?column_index=1&api_key=nf68sBZ1FqJ86q9xzvWx";
    var nickelURL = "https://www.quandl.com/api/v3/datasets/LME/PR_NI?column_index=1&api_key=nf68sBZ1FqJ86q9xzvWx";

    var cobaltPrice = "";
    var cobaltDateRefreshed = "";
    var nickelPrice = "";
    var nickelDateRefreshed = "";

    //cobalt ajax call
    $.ajax({
        url: cobaltURL,
        method: "GET"
    })
        .done(function (response) {
            var results = response.dataset;
            cobaltPrice = (results.data[0])[1];
            console.log(results.name);
            console.log(results.description);
            console.log("price = " + cobaltPrice);
            cobaltDateRefreshed = results.newest_available_date;
            console.log("Price refreshed at " + cobaltDateRefreshed);

        });

        //nickel ajax call
    $.ajax({
        url: nickelURL,
        method: "GET"
    })
        .done(function (response) {
            var results = response.dataset;
            nickelPrice = (results.data[0])[1];
            console.log(results.name);
            console.log(results.description);
            console.log("price = " + nickelPrice);
            nickelDateRefreshed = results.newest_available_date;
            console.log("Price refreshed at " + nickelDateRefreshed);

        });

    //iron, ammonia, nitrogen, hydrogen, nickel



    var database = firebase.database();

    var spectraRef = database.ref('spectraType');

    var userRef = database.ref('users');

    spectraRef.on("value", gotData, errData);

    var accessibility = [];

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
            "sharePrice": 10,
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
            "sharePrice": 20
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
            "sharePrice": 30
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
            "Group": "APO",
            "sharePrice": 40
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
            "sharePrice": 50
        }];


    //build CAF array. 
    for (i = 0; i < asteroidObj.length; i++) {
        //Campodonico Accessibiility Factor (or the CAF)
        accessibility.push(asteroidObj[i].moid * asteroidObj[i].velocity * 10);
        $("#asteroidTable tr:last").after("<tr><td>" + asteroidObj[i].name +
            "</td><td>" + asteroidObj[i].value +
            "</td><td>" + asteroidObj[i].estProfit +
            "</td><td>" + accessibility[i] +
            "</td><td>" + "placeholder" +
            "</td><td>" + asteroidObj[i].sharePrice + "</td></tr>");
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

    function errData(err) {
        console.log("error!");
        console.log(err);
    }

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

            for (i=0;i<asteroidObj.length;i++){
                if (asteroidObj[i].Type===user.spectra){
                    console.log("yessir");
                    console.log(asteroidObj[i].sharePrice);
                    if (user.investAmt < asteroidObj[i].sharePrice){
                        console.log("you do not have sufficient funds to invest in one share of this asteroid type");
                    }else{
                        var numOfShares = Math.floor(user.investAmt/asteroidObj[i].sharePrice);
                        console.log(numOfShares);
                    }
                }else{}
            }
        }
    });






    console.log(asteroidObj);
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

    var trace1 = {
        x: accessibility,
        y: [10, 20, 30, 40, 50],
        text: [asteroidObj[0].name, asteroidObj[1].name, asteroidObj[2].name, asteroidObj[3].name, asteroidObj[4].name],
        mode: 'markers',
        marker: {
            size: [100, 100, 100, 100, 100],
            sizemode: 'area'
        }
    };

    var data = [trace1];

    var layout = {
        title: "Available Asteroids",
        showLegend: true,
        height: 400,
        width: 480,
        xaxis: {
            title: 'Accessibility Factor (CAF)',
        },
        yaxis: {
            title: 'Price per Share (USD)',
        }
    };


    Plotly.newPlot('productTitle', data, layout);
});




