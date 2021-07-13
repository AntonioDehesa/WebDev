require('dotenv').config();

const express = require("express");
const https = require("https");
const { response } = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get("/", function(req,res)
{
    res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req,res)
{
    console.log("Post received");
    var query = req.body.City;
    var unit = "metric";
    const apiKey = process.env.OpenWeatherAPI;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    var weather = https.get(url);
    
    https.get(url,function(response)
    {
        console.log(response.statusCode);
        response.on("data", function(data)
        {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            var temp = weatherData.main.temp;
            console.log(temp);
            res.write("<h1>The temperature in " + query + " is " + temp + "</h1>");
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