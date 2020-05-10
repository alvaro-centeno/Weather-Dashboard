$(document).ready(function () {
    var userInput = "";
    $("#submitBtn").on("click", function (e) {
        e.preventDefault();

        let userInput = $("#userInput").val();

        console.log(userInput);

        $("#userInput").val("");

        var api_key = "3dababe5876bb70212d76fb0d2f5aa26";

        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=imperial&appid=${api_key}`,
            dataType: "json",
        }).then(function (response) {

            var cityName = response.name;
            var kelvin = Math.floor(response.main.temp_max);
            var humidity = response.main.humidity;
            var windSpeed = response.windSpeed;
            var clouds = response.clouds.all;
            // var dailyTemp = response.daily.temp.max;

            $("#previousSearch").append(`<li class="list-group-item" style="width:20rem">${cityName}</li>`)
            $("#cityName").append(`<h3>${cityName}</h3>`)
            $("#cityInfo").append(`<p>Temperature: ${kelvin}<br>Humidity: ${humidity}<br>Wind Speed: ${windSpeed} <br> Clouds: ${clouds}</p> `);
        });




    })

})