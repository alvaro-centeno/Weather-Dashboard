$(document).ready(function () {
    var userInput = "";
    $("#submitBtn").on("click", function (e) {
        e.preventDefault();



        let userInput = $("#userInput").val();

        // console.log(userInput);

        $("#userInput").val("");

        var api_key = "3dababe5876bb70212d76fb0d2f5aa26";

        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=imperial&appid=${api_key}`,
            dataType: "json",
        }).then(function (response) {
            var icon = response.weather[0].icon;
            var cityName = response.name;
            var kelvin = Math.floor(response.main.temp_max);
            var humidity = response.main.humidity;
            var windSpeed = response.windSpeed;
            var clouds = response.clouds.all;
            var today = moment().format('l');

            // var dailyTemp = response.daily.temp.max;

            $("#previousSearch").append(`<li class="list-group-item" style="width:20rem">${cityName}</li>`)
            $("#cityName").append(`<h3>${cityName}  (${today})</h3>`)
            $("#cityInfo").append(`<p>Temperature: ${kelvin} <img src = "http://openweathermap.org/img/wn/${icon}.png"><br>Humidity: ${humidity}<br>Wind Speed: ${windSpeed} <br> Clouds: ${clouds}<br>${icon}</p> `);




            $.ajax({
                type: "GET",
                url: `https://api.openweathermap.org/data/2.5/forecast/daily?q=${userInput}&cnt=5&units=imperial&appid=${api_key}`,
                dataType: "json",
            }).then(function (response) {
                console.log(response)
                var i = 0;

                var iconTwo = response.list[0].weather[0].icon;
                var iconThree = response.list[1].weather[0].icon;
                var iconFour = response.list[2].weather[0].icon;
                var iconFive = response.list[3].weather[0].icon;
                var iconSix = response.list[4].weather[0].icon;
                var dayOne = Math.floor(response.list[0].temp.max);
                var dayTwo = Math.floor(response.list[1].temp.max);
                var dayThree = Math.floor(response.list[2].temp.max);
                var dayFour = Math.floor(response.list[3].temp.max);
                var dayFive = Math.floor(response.list[4].temp.max);
                var oneHumid = response.list[0].humidity;
                var twoHumid = response.list[1].humidity;
                var threeHumid = response.list[2].humidity;
                var fourHumid = response.list[3].humidity;
                var fiveHumid = response.list[4].humidity;
                var first = moment().add(1, 'days').format('l');
                var second = moment().add(2, 'days').format('l');
                var third = moment().add(3, 'days').format('l');
                var fourth = moment().add(4, 'days').format('l');
                var fifth = moment().add(5, 'days').format('l');



                $("#dayOne").append(`<p>${first} <br>Temp: ${dayOne} <img src = "http://openweathermap.org/img/wn/${iconTwo}.png"><br> Humidity: ${oneHumid}%</p>`);
                $("#dayTwo").append(`<p>${second}<br> Temp: ${dayTwo}<img src = "http://openweathermap.org/img/wn/${iconThree}.png"><br> Humidity: ${twoHumid}%</p>`);
                $("#dayThree").append(`<p>${third}<br> Temp:${dayThree}<img src = "http://openweathermap.org/img/wn/${iconFour}.png"><br> Humidity: ${threeHumid}%</p>`);
                $("#dayFour").append(`<p>${fourth}<br> Temp: ${dayFour}<img src = "http://openweathermap.org/img/wn/${iconFive}.png"><br> Humidity: ${fourHumid}%</p>`);
                $("#dayFive").append(`<p>${fifth}<br> Temp: ${dayFive}<img src = "http://openweathermap.org/img/wn/${iconSix}.png"><br> Humidity: ${fiveHumid}%</p>`);


            });
        });

    });




})

