require('dotenv').config(); //Required to store API keys in env and not in code
const express = require("express");
const https = require("https");
const { response } = require("express");



const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req,res)
{
    res.sendFile(__dirname + "/signup.html");
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



app.post("/failure", function(req,res)
{
    res.redirect("/");
});


app.listen(3000, function()//for heroku change port to process.env.PORT
{
    console.log("Server is listening on port 3000");
});

//Unique ID for audience: 9e4eb01c13
//check later: https://mailchimp.com/developer/marketing/guides/quick-start/#make-your-first-api-call

/*
{
  "email_address": "$user_email",
  "status": "subscribed",
  "merge_fields": {
	"FNAME": "$user_fname",
	"LNAME": "$user_lname"
  }
}
*/