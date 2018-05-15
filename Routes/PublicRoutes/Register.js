
  exports.register = function(req,res){
    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var User = require('./../../domain/User');
    var mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var newUser;

    ////Getting values from body;
    var user = new User(req.body.Voornaam, req.body.Achternaam, req.body.Email, req.body.Wachtwoord);

    if (typeof user.Voornaam === '' || typeof user.Achternaam === '' || typeof user.Email === '' || typeof user.Wachtwoord === '') {
      res.status(412).json({
          "message": 'One or more parameters are missing',
          "status": 412,
          "parameters": req.body
      })
        } else if (!mailRegex.test(user.Email)) {
      res.status(412).json({
          "message": "Please enter a valid email",
          "status": 412,
          "parameters": res.body
      })
        }  else {
      res.status(200).json({
          "message": "Succesfully registered",
          "status": 200,
          "parameters": req.body
      })
        ////Creating set from User
  newUser={
    "Voornaam": user.Voornaam,
    "Achternaam": user.Achternaam,
    "Email": user.Email,
    "Wachtwoord": user.Wachtwoord 
}
  }


    console.log("Got user from body: " + JSON.stringify(newUser));


    ////Fire query
    connection.connection.query('INSERT INTO user SET ?', newUser, function (error, results, fields) {

    if (error) {
      console.log("error ocurred in register");
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