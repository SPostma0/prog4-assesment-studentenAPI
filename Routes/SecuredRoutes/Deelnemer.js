exports.registerParticipant = function(req,res){
    console.log("Participant register router called");
    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Deelnemer = require('./../../domain/Deelnemer');
    var Security = require('./../../Security');

 
    ////Decode token and get userid from it
      decodedToken = Security.decodeToken(req,res);
      UserID = JSON.parse(decodedToken).id;

    //checking input fields
    var pad = req.path.split('/');
    var houseId = pad[3];
    var maaltijdID = pad[5]


    ////Creating set from User
    var deelnemer = new Deelnemer("" + UserID, ""+ houseId, ""+ maaltijdID);
    

    console.log(JSON.stringify(deelnemer));
    if(deelnemer.UserID == null || deelnemer.StudentenhuisID == null || deelnemer.MaaltijdID == null){
          res.status(401);
          res.json({
            "message":"Missende parameters"
          });
          res.end();
          return;
    }

    ////Fire query
    connection.connection.query('INSERT INTO deelnemers SET ?', deelnemer, function (error, results, fields) {

    if (error) {
        console.log("/reg participant/ Patricipant already subscribed. ");
        res.send({
          "code":409,
          "failed":"Gebruikers is al aangemeld"
        })
        res.end();

        connection.connection.end();
        }else{

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

    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var jwt = require('jsonwebtoken');
    var Security = require('./../../Security');
    var Deelnemer = require('./../../domain/Deelnemer');

    ////Decode token and get userid from it
    decodedToken = Security.decodeToken(req,res);
    UserID = JSON.parse(decodedToken).id;

    //checking input fields
    var pad = req.path.split('/');
    var houseId = pad[3];
    var maaltijdID = pad[5]



        ////Fire query
    connection.connection.query('SELECT * FROM deelnemers WHERE StudentenhuisID = "' + houseId + '" AND MaaltijdID = "' + maaltijdID + '";',  function (error, results, fields) {

      /////////IN GEVAL DB ERROR
    if (error) {
        console.log("/get participants/ Error occured" + error);
        res.send({
        "code":400,
        "failed":"error ocurred"
        })

        res.end();
        connection.connection.end();

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
    console.log('deletePatricipant router called');

    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var jwt = require('jsonwebtoken');
    var Security = require('./../../Security');
    var Deelnemer = require('./../../domain/Deelnemer');

    ////Decode token and get userid from it
    decodedToken = Security.decodeToken(req,res);
    UserID = JSON.parse(decodedToken).id;

    //checking input fields
    var pad = req.path.split('/');
    var houseId = pad[3];
    var maaltijdID = pad[5]



    ////Fire query
    connection.connection.query('DELETE FROM deelnemers WHERE StudentenhuisID = "' + houseId + '" AND MaaltijdID = "' + maaltijdID + '" AND UserID = "' + UserID + '";',  function (error, results, fields) {



      /////////IN GEVAL DB ERROR
    if (error) {
        console.log("/delete participant/ Error occured" + error);
        res.send({
        "code":400,
        "failed":"error ocurred"
        })

        res.end();
        connection.connection.end();

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
