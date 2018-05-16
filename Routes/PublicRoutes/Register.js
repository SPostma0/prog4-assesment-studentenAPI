
  exports.register = function(req,res){
/////////////////////////////
//////SETUP DEPENDANCIES/////
/////////////////////////////

    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var User = require('./../../domain/User').user;
    var jwt = require('jsonwebtoken');
    var Security = require('./../../Security');
    var ApiError = require('./../../domain/ApiError');

//////////////////////////////////
//////CREATING USER FROM BODY/////
//////////////////////////////////
        if(req.body.Voornaam == null ||req.body.Achternaam == null ||req.body.Wachtwoord == null ||req.body.Email == null){
            console.log('throwing error')
            throw(new ApiError(412, "Missing parameters"));
            res.status(412).send({"Message":"Missing paramters"}).end();
            return;
        }


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
      res.status(401).send({
        "code":401,
        "failed":"error ocurred"
                }).end();

/////////////////////////////
//////KILL CONNECTIONS///////
/////////////////////////////                
      connection.connection.end();
    }else{

///////////////////////////////////
//IF SUCCESS, KILL CONNECTIONS/////
///////////////////////////////////     
   
connection.connection.query('SELECT * FROM user WHERE Email = "' + user.Email + '";',  function (error, results, fields) {

    /////////////////////////////
    ////////////IF DB ERROR//////
    /////////////////////////////
        if (error) {
            console.log("/Register/ Error occured" + error);
            res.send({
                        "code":400,
                        "failed":"error ocurred"})
            res.end();
            connection.connection.end();
            }else{
    
    
    /////////////////////////////
    ////////IF LOGIN SUCCES//////
    /////////////////////////////
    
        
    
                    user = {id: results[0].ID};
    /////////////////////////////////
    //////SIGN TOKEN WITH USERID/////
    /////////////////////////////////          
                const token =           jwt.sign({user}     , Security.secret);
    
                var returnToken =       { "token" : token}
    
    /////////////////////////////
    ////RETURN TOKEN TO CLIENT///
    /////////////////////////////                                   
    res.json(returnToken);
    
    
    /////////////////////////////
    ////////FALSE LOGIN DETAILS//
    /////////////////////////////
     
    
    /////////////////////////////////////
    //KILL CONNECTION TO DB & CLIENT/////
    /////////////////////////////////////       
        res.end()
        connection.end();
            }
        });
      }
    
    });
  }


