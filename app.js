$(document).ready(function () {
    // var userInput = "";

    $("#submitBtn").on("click", function (e) {
        e.preventDefault();
        let userInput = $("#userInput").val();
        // console.log(userInput);
        $("#userInput").val("");

        var api_key = "3dababe5876bb70212d76fb0d2f5aa26";
        // JSON.parse(window.localStorage.getItem(response)) || [];

        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=imperial&appid=${api_key}`,
            dataType: "json",
        }).then(function (response) {

            var icon = response.weather[0].icon;
            var cityName = response.name;
            var kelvin = Math.floor(response.main.temp_max);
            var humidity = response.main.humidity;
            var windSpeed = response.wind.speed;
            var today = moment().format('l');
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            $("#current").empty();

            $("#current").prepend(`<div class="card" style="width: 50rem">
<div class="card-body">
    <h3 class="card-title" id="cityName">${cityName}  (${today})<img src = "http://openweathermap.org/img/wn/${icon}.png"></h3>
    <p class="card-text" id="cityInfo">Temperature: ${kelvin}°F  <br>Humidity: ${humidity}%<br>Wind Speed: ${windSpeed} MPH</p>
</div>
</div> `);
            $("#fiveDay").text("5 Day Forecast:")
            $("#previousSearch").prepend(`<li class="list-group-item" style="width:20rem">${cityName}</li>`);
            $("#forecast").empty();

            $("li").on("click", function () {
                $("#userInput").prepend("history");
            })

            $.ajax({
                type: "GET",
                url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${api_key}`,
                dataType: "json",
            }).then(function (response) {
                var uvi = response.current.uvi;
                // console.log(response.current.uvi);
                $("#cityInfo").append(`<p id="uvi">UV: ${uvi}</p>`);

                if (uvi < 4) {

                    $("#uvi").css("background-color", "green")
                } else if (uvi < 7) {
                    $("#uvi").css("background-color", "yellow")
                } else {
                    $("#uvi").css("background-color", "red")
                };


                $.ajax({
                    type: "GET",
                    url: `https://api.openweathermap.org/data/2.5/forecast/daily?q=${userInput}&cnt=5&units=imperial&appid=${api_key}`,
                    dataType: "json",
                }).then(function (response) {

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


                    $("#forecast").append(`
                <div class="col-sm-2">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body bg-primary">
                            <h5 class="card-title" id="firstDay"></h5>
                            <p class="card-text" id="dayCast">${first} <br>Temp: ${dayOne} <img src = "http://openweathermap.org/img/wn/${iconTwo}.png"><br> Humidity: ${oneHumid}%</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body bg-primary">
                            <h5 class="card-title" id="firstDay"></h5>
                            <p class="card-text" id="dayCast">${second} <br>Temp: ${dayTwo} <img src = "http://openweathermap.org/img/wn/${iconThree}.png"><br> Humidity: ${twoHumid}%</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body bg-primary">
                            <h5 class="card-title" id="firstDay"></h5>
                            <p class="card-text" id="dayCast">${third} <br>Temp: ${dayThree} <img src = "http://openweathermap.org/img/wn/${iconFour}.png"><br> Humidity: ${threeHumid}%</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body bg-primary">
                            <h5 class="card-title" id="firstDay"></h5>
                            <p class="card-text" id="dayCast">${fourth} <br>Temp: ${dayFour} <img src = "http://openweathermap.org/img/wn/${iconFive}.png"><br> Humidity: ${fourHumid}%</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="card" style="width: 18rem;" id="special">
                        <div class="card-body bg-primary" >
                            <h5 class="card-title" id="dayOne"></h5>
                            <p class="card-text" id="dayCast">${fifth} <br>Temp: ${dayFive} <img src = "http://openweathermap.org/img/wn/${iconSix}.png"><br> Humidity: ${fiveHumid}%</p>
                        </div>
                    </div>
                </div>`);



                });
            });
        });





    });




})

