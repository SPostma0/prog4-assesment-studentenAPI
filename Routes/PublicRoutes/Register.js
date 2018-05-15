
  exports.register = function(req,res){
/////////////////////////////
//////SETUP DEPENDANCIES/////
/////////////////////////////

    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var User = require('./../../domain/User').user;

//////////////////////////////////
//////CREATING USER FROM BODY/////
//////////////////////////////////

    var user = new User(req.body.Voornaam, req.body.Achternaam, req.body.Email, req.body.Wachtwoord);

///////////////////////////////////
////CREATING SET FOR DB INSERT/////  NOT ACTUALLY REQUIRED. BUT WOULD ALLOW FOR EASY LOCALIZED ASSERTION OF ERRORS.
///////////////////////////////////

    var newUser={
        "Voornaam": user.Voornaam,
        "Achternaam": user.Achternaam,
        "Email": user.Email,
        "Wachtwoord": user.Wachtwoord 
    }
    console.log("Got user from body: " + JSON.stringify(newUser));

/////////////////////////////
////FIRE QUERY AT DATABA/////
/////////////////////////////
    connection.connection.query('INSERT INTO user SET ?', newUser, function (error, results, fields) {

//////////////////////////////////////
///IF ERROR. LIKELY EMAIL NOT UNQ/////
//////////////////////////////////////      
    if (error) {
      console.log("error ocurred in register. Is the email unique?");
      res.send({
        "code":400,
        "failed":"error ocurred"
                })

/////////////////////////////
//////KILL CONNECTIONS///////
/////////////////////////////                
      res.end();
      connection.connection.end();
    }else{

///////////////////////////////////
//IF SUCCESS, KILL CONNECTIONS/////
///////////////////////////////////     
      console.log('Regged user! ')
      res.send({
        "code":200,
        "success":"user registered sucessfully"
          });
          res.end();
          connection.connection.end();
    }
    });
  }


