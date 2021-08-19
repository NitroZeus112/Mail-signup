    const express = require("express");
    const bodyParser = require("body-parser");
    const request = require("request");
    const https = require("https");
    const app = express();

    app.use(express.static("Public"));
    app.use(express.urlencoded({extended: true}));

    app.get("/", function(req,res) {
        res.sendFile(__dirname + "/signup.html");
    });

    app.post("/", function(req,res) {
        const firstName = req.body.fName;
        const lastName = req.body.lName;
        const email = req.body.email;
        // console.log(firstName, lastName, email);
        const data = {
            members: [
                {
                    email_address: email,
                    status: "subscribed",
                    merge_fields: {
                        FNAME: firstName,
                        LNAME: lastName
                    }
                }
            ]
        }
        const jsonData = JSON.stringify(data);
        const url = "https://us5.api.mailchimp.com/3.0/lists/abb6fe46ba"
        const options = {
            method: "post",
            auth: "Yashasvi:29c005ed0c7690e261fca028b3f0f390-us5"
        }
        const request = https.request(url, options, function(response) {
            if(response.statusCode === 200)
            {
                res.sendFile(__dirname + "/success.html");
            }
            else{
                res.sendFile(__dirname + "/failure.html");
            }
            });
        request.write(jsonData);
        request.end();
    });

    app.post("/failure", function(req,res){
        res.redirect("/");
      });

    app.listen(5500, function() {
        console.log("Server up and running on port 5500!");
    });




    // Mailchimp API Key:  29c005ed0c7690e261fca028b3f0f390-us5
    // List ID: abb6fe46ba