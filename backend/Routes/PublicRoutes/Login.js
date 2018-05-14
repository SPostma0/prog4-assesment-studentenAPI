exports.login = function(req,res){

    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var jwt = require('jsonwebtoken');
    var Security = require('./../../Security');

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
  }
