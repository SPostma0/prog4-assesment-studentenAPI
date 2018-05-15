exports.login = function(req,res){


/////////////////////////////
////////////SETUP DEPEND/////
/////////////////////////////   
    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var jwt = require('jsonwebtoken');
    var Security = require('./../../Security');



/////////////////////////////
////////////SETUP USER///////
/////////////////////////////
    var User ={
        "Email": req.body.Email,
        "Wachtwoord": req.body.Wachtwoord 
    }
    console.log("/LOGIN/Got user from body: " + JSON.stringify(User));


/////////////////////////////
//////FIRE QUERY TO DATA/////
/////////////////////////////
    connection.connection.query('SELECT * FROM user WHERE Email = "' + User.Email + '" AND Wachtwoord = "' + User.Wachtwoord + '";',  function (error, results, fields) {

/////////////////////////////
////////////IF DB ERROR//////
/////////////////////////////
    if (error) {
        console.log("/LOGIN/ Error occured" + error);
        res.send({
                    "code":400,
                    "failed":"error ocurred"})
        res.end();
        connection.connection.end();
        }else{


/////////////////////////////
////////IF LOGIN SUCCES//////
/////////////////////////////
        if(results.length === 1){
                console.log("Login succesfull")

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
        }else{
            console.log("Login Not Succesfull")
            res.send({message:"invalid credentials"})
        }

/////////////////////////////////////
//KILL CONNECTION TO DB & CLIENT/////
/////////////////////////////////////       
    res.end()
    connection.end();
        }
    });
  }
