const express = require("express");
const https = require("https");


const app = express();


app.get("/", function(req,res)
{
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=c69ef9ab35e75cbb525faf65f0255336&units=metric";
    var weather = https.get(url);
    //res.send("Server is up and running");
    //console.log(weather);
    https.get(url,function(response)
    {
        console.log(response.statusCode);
        response.on("data", function(data)
        {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            var temp = weatherData.main.temp;
            console.log(temp);
            res.write("<h1>" + temp + "</h1>");
            var description = weatherData.weather[0].description;
            var icon = weatherData.weather[0].icon;
            var iconImg = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(description);
            res.write("<h1>" + description + "</h1>");
            res.write("<img src='" + iconImg + "' alt='Icon'>");
            res.send();
        });
    });
});

app.listen(3000, function()
{
    console.log("The server is running in port 3000");
});