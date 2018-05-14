
  exports.register = function(req,res){
    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var User = require('./../../domain/User');

    ////Getting values from body;
    var user = new User(req.body.Voornaam, req.body.Achternaam, req.body.Email, req.body.Wachtwoord);

    ////Creating set from User
    var newUser={
        "Voornaam": user.Voornaam,
        "Achternaam": user.Achternaam,
        "Email": user.Email,
        "Wachtwoord": user.Wachtwoord 
    }

    console.log("Got user from body: " + JSON.stringify(user));

    ////Fire query
    connection.connection.query('INSERT INTO user SET ?', newUser, function (error, results, fields) {

    if (error) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
      res.end();

      connection.connection.end();
    }else{
      console.log('The solution is: ', results);
      res.send({
        "code":200,
        "success":"user registered sucessfully"
          });
          res.end();
          connection.connection.end();
    }
    });
  }