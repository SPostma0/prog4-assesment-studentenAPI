exports.login = function(req,res){

    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var jwt = require('jsonwebtoken');
    var Security = require('./../../Security');
    var mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    ////Getting values from body;

    ////Creating set from User
    var User ={

        "Email": req.body.Email,
        "Wachtwoord": req.body.Wachtwoord 
    }

    console.log("/LOGIN/Got user from body: " + JSON.stringify(User));

    ////Fire query
    connection.connection.query('SELECT * FROM user WHERE Email = "' + User.Email + '" AND Wachtwoord = "' + User.Wachtwoord + '";',  function (error, results, fields) {



      /////////IN GEVAL DB ERROR
    if (error) {
      console.log("/LOGIN/ Error occured" + error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
      res.end();
      connection.connection.end();
    }else{


              //////////////ALS LOGIN SUCCES
        if(results.length === 1){
            console.log("Login succesfull")

            user = {
              id: results[0].ID
            };
          
            const token = jwt.sign({user}, Security.secret);

            var returnToken = {
              "token" : token
            }
            res.json(returnToken);


            //////////ALS LOGIN GEEN SUCCES
        }else{
            console.log("Login Not Succesfull")
            res.send({message:"invalid"})
        }

        res.end()
      connection.end();
    }
    });

    function validate (error, rows, field) {
      if (typeof Voornaam === 'undefined' || typeof Achternaam === 'undefined' || typeof Email === 'undefined' || typeof Wachtwoord === 'undefined') {
          response.status(412).json({
              "message": 'One or more parameters are missing',
              "status": 412,
              "parameters": request.body
          })
      } else if (!regex.test(Email)) {
          response.status(412).json({
              "message": "Please enter a valid email",
              "status": 412,
              "parameters": response.body
          })
      } else if (error) {
          response.status(500).json({
              "message": "Something went wrong: " +error,
              "status": 500,
              "parameters": request.body
          })
      } else {
          response.status(200).json({
              "message": "Succesfully registered",
              "status": 200,
              "parameters": request.body
          })
      }
  }
  }
