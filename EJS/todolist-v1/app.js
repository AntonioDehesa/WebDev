require('dotenv').config(); //Required to store API keys in env and not in code
const express = require("express");
const https = require("https");
const { response } = require("express");



const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");

app.get("/", function(req,res)
{
    var today = new Date();
    var day = "";
    switch (today.getDay())
    {
        case 0:
            day = "Monday";
            break;
        case 1:
            day = "Tuesday";
            break;
        case 2:
            day = "Wednesday";
            break;
        case 3:
            day = "Thursday";
            break;
        case 4:
            day = "Friday";
            break;
        case 5:
            day = "Saturday";
            break;
        case 6:
            day = "Sunday";
            break;
        default:
            break;
    }
    res.render("list", {DAY: day});
    //res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req,res)
{
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var MailChimpAPI = process.env.MailChimpAPI;
    var data = 
    {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:
                {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);
    const url = "https://us5.api.mailchimp.com/3.0/lists/9e4eb01c13";

    const options = {
        method: "POST",
        auth: "Antonio:"+MailChimpAPI
    }
    
    const request = https.request(url, options, function(response)
    {
        if(response.statusCode === 200)
        {
            res.sendFile(__dirname + "/succes.html");
        }
        else
        {
            res-sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data)
        {
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();
});


app.listen(3000, function()
{
    console.log("Server is running on port 3000");
});