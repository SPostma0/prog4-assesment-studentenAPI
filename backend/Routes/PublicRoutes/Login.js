exports.login = function(req,res){

    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;

    ////Getting values from body;

    ////Creating set from User
    var User ={

        "Email": req.body.Email,
        "Wachtwoord": req.body.Wachtwoord 
    }

    console.log("/LOGIN/Got user from body: " + JSON.stringify(User));

    ////Fire query
    connection.connection.query('SELECT * FROM user WHERE Email = "' + User.Email + '" AND Wachtwoord = "' + User.Wachtwoord + '";',  function (error, results, fields) {

    if (error) {
      console.log("/LOGIN/ Error occured" + error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
      res.end();

      connection.connection.end();
    }else{

        if(results.length === 1){
            console.log("Login succesfull")
            res.send({message:"Goeie shit"})
        }else{
            console.log("Login Not Succesfull")
            res.send({message:"Kutzooi"})
        }

        res.end()
      connection.end();
    }
    });
  }
