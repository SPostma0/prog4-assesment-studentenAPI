exports.registerParticipant = function(req,res){
//////////////////////////////
///////SETUP DEPENDANCIES/////
//////////////////////////////     
    console.log("Participant register router called");
    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Deelnemer = require('./../../domain/Deelnemer');
    var Security = require('./../../Security');

 
//////////////////////////////
///FETCH UID FROM TOKEN///////
//////////////////////////////  

      decodedToken = Security.decodeToken(req,res);
      UserID = JSON.parse(decodedToken).id;

/////////////////////////////////
///SPLITTING PATH FOR DATA///////
/////////////////////////////////  

    var pad = req.path.split('/');
    var houseId = pad[3];
    var maaltijdID = pad[5]

/////////////////////////////////////////
///CREATING DEELNEMER FOR INSERT/////////
/////////////////////////////////////////   

    var deelnemer = new Deelnemer("" + UserID, ""+ houseId, ""+ maaltijdID);
    console.log(JSON.stringify(deelnemer));

/////////////////////////////////
///VALIDATION OF PARAMS//////////
/////////////////////////////////         
    if(deelnemer.UserID == null || deelnemer.StudentenhuisID == null || deelnemer.MaaltijdID == null){
          res.status(401);
          res.json({
            "message":"Missende parameters"
          });
          res.end();
          return;
    }

/////////////////////////////////
///FIRE INSERT TO DATABA/////////
/////////////////////////////////     
    connection.connection.query('INSERT INTO deelnemers SET ?', deelnemer, function (error, results, fields) {

///////////////////////////////////////////////////////////////
///IF DB ERRORS ON YOU. LIKELY ALREADY EXISTING RECORD/////////
///////////////////////////////////////////////////////////////           
    if (error) {
        console.log("/reg participant/ Patricipant already subscribed. ");
        res.send({
          "code":409,
          "failed":"Gebruikers is al aangemeld"
        })
        res.end();

        connection.connection.end();
        }else{

/////////////////////////////////
///GREAT BALLS OF FIRE///////////
/////////////////////////////////     

        res.send({
          "code":200,
          "success":"participant registered sucessfully"
            });
            res.end();
            connection.connection.end();
      }
    });
  }

  exports.getParticipants = function(req,res){

//////////////////////////////
///////SETUP DEPENDANCIES/////
//////////////////////////////   

    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var jwt = require('jsonwebtoken');
    var Security = require('./../../Security');
    var Deelnemer = require('./../../domain/Deelnemer');

//////////////////////////////
///FETCH UID FROM TOKEN///////
//////////////////////////////  

    decodedToken = Security.decodeToken(req,res);
    UserID = JSON.parse(decodedToken).id;

/////////////////////////////////
///SPLITTING PATH FOR DATA///////
/////////////////////////////////  

    var pad = req.path.split('/');
    var houseId = pad[3];
    var maaltijdID = pad[5]


/////////////////////////////////
///FIRE QUERY AT DB./////////////
///////////////////////////////// 

    connection.connection.query('SELECT * FROM deelnemers WHERE StudentenhuisID = "' + houseId + '" AND MaaltijdID = "' + maaltijdID + '";',  function (error, results, fields) {

/////////////////////////////////
///ON DB ERROR 400///////////////
///////////////////////////////// 
    
    if (error) {
        console.log("/get participants/ Error occured" + error);
        res.send({
        "code":400,
        "failed":"error ocurred"
        })
        res.end();
        connection.connection.end();


////////////////////////////////////////////
///PUT STUFF IN RESPONSE ARRAY./////////////
/////////////////////////////////////////// 
    }else{
        responseArray = [];
      results.forEach(element => {
            responseArray.push(new Deelnemer(element.UserID, element.StudentenhuisID, element.MaaltijdID));
      });
        res.status(200);
        res.json(responseArray);
        res.end()
      connection.end();
    }
    });
  }



  
  exports.deletePatricipant = function(req,res){
//////////////////////////////
///////SETUP DEPENDANCIES/////
//////////////////////////////     
    console.log('deletePatricipant router called');
    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var jwt = require('jsonwebtoken');
    var Security = require('./../../Security');
    var Deelnemer = require('./../../domain/Deelnemer');

//////////////////////////////
///FETCH UID FROM TOKEN///////
//////////////////////////////  
    decodedToken = Security.decodeToken(req,res);
    UserID = JSON.parse(decodedToken).id;

/////////////////////////////////
///SPLITTING PATH FOR DATA///////
/////////////////////////////////  
    var pad = req.path.split('/');
    var houseId = pad[3];
    var maaltijdID = pad[5]



/////////////////////////////////
///FIRE QUERY AT DB//////////////
///////////////////////////////// 
    
    connection.connection.query('DELETE FROM deelnemers WHERE StudentenhuisID = "' + houseId + '" AND MaaltijdID = "' + maaltijdID + '" AND UserID = "' + UserID + '";',  function (error, results, fields) {

/////////////////////////////////
///ON DB ERROR 400///////////////
///////////////////////////////// 
    
    if (error) {
        console.log("/delete participant/ Error occured" + error);
        res.send({
        "code":400,
        "failed":"error ocurred"
        })

        res.end();
        connection.connection.end();
/////////////////////////////////
///ON SUCCES/////////////////////
///////////////////////////////// 
    }else{
        res.status(200);
        res.json({
          "message":"Executed"
        })
        res.end();
        connection.end();
    }
    });
  }
