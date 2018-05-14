
  exports.registermeal = function(req,res){
    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Maaltijd = require('./../../domain/Maaltijd');

 
    ////Creating set from User

    var newMeal={
        "Naam": req.body.Naam,
        "Beschrijving": req.body.Beschrijving,
        "Ingredienten": req.body.Ingredienten,
        "Allergie": req.body.Allergie,
        "Prijs": req.body.Prijs,
        "UserID": req.body.UserID,
        "StudentenhuisID": req.body.StudentenhuisID
    }

    console.log("Got meal from body: " + JSON.stringify(newMeal));

    ////Fire query
    connection.connection.query('INSERT INTO maaltijd SET ?', newMeal, function (error, results, fields) {

    if (error) {
      console.log("The following error occured: ",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
      res.end();

      connection.connection.end();
    }else{
      console.log('The result is: ', results);
      res.send({
        "code":200,
        "success":"meal registered sucessfully"
          });
          res.end();
          connection.connection.end();
    }
    });
  }