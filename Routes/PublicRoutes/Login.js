exports.login = function(req,res){


/////////////////////////////
////////////SETUP DEPEND/////
/////////////////////////////   
    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var jwt = require('jsonwebtoken');
    var Security = require('./../../Security');
    var User = require('./../../domain/User');
    var bcrypt = require('bcrypt');
    const assert = require('assert')
    const validator = require('validator');
    const ApiError = require('./../../domain/ApiError');



/////////////////////////////
////////////SETUP USER///////
/////////////////////////////
    

try{
    assert(validator.isEmail(req.body.Email), 'email dit not pass validation');
}catch(ex){
    res.status(412).json({"message":ex.toString()}).end();
    throw(new ApiError(412,ex.toString()));
    return;
}
    

    var User ={
        "Email": req.body.Email,
        "Wachtwoord": req.body.Wachtwoord
    }
    console.log("/LOGIN/Got user from body: " + JSON.stringify(User));


/////////////////////////////
//////FIRE QUERY TO DATA/////
/////////////////////////////

    connection.connection.query('SELECT * FROM user WHERE Email = "' + User.Email + '";',  function (error, results, fields) {

/////////////////////////////
////////////IF DB ERROR//////
/////////////////////////////
    if (error) {
        console.log("/LOGIN/ Error occured" + error);
        res.status((401)).res.send({
                    "code":400,
                    "failed":"error ocurred"}).res.end();
        connection.end();
        
        throw(new ApiError(401, "erreur"));
        return;
        }else{


/////////////////////////////
////////IF LOGIN SUCCES//////
/////////////////////////////

        if(results.length === 1 && bcrypt.compareSync(User.Wachtwoord, results[0].Wachtwoord)){
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
res.status(200).json(returnToken).end();
connection.end();
return;


/////////////////////////////
////////FALSE LOGIN DETAILS//
/////////////////////////////
        }else{
            connection.end();
            console.log("Login Not Succesfull")
            res.status(401).send({"Message":"Invalid"}).end();
            throw(new ApiError(401, "Credentials invalid"))
            return;
            
        }

/////////////////////////////////////
//KILL CONNECTION TO DB & CLIENT/////
/////////////////////////////////////       
    res.end()
    connection.end();
        }
    });
  }
