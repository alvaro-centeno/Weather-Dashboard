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
            url: `https://api.openweathermap.org/data/2.5/weather?zip=${userInput}&units=imperial&appid=${api_key}`,
            dataType: "json",
        }).then(function (response) {

            var cityName = response.name;
            var kelvin = Math.floor(response.main.temp_max);

            $("body").prepend(`<h1>The temperatur is ${kelvin} in ${cityName}</h1> `);
        });




    })

})