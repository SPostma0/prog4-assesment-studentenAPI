exports.registerParticipant = function(req,res){
    console.log("Participant register router called");
    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Security = require('./../../Security');


    ////Decode token and get userid from it
      decodedToken = Security.decodeToken(req,res);
      UserID = JSON.parse(decodedToken).id;

    //checking input fields
    var pad = req.path.split('/');
    var houseId = pad[3];
    var maaltijdID = pad[5]


    ////Creating set from User

    if(meal.Naam == null || meal.Beschrijving  == null || meal.Ingredienten  == null || meal.Allergie  == null || meal.Prijs == null || meal.UserID  == null || meal.StudentenhuisID == null){
        console.log("/registermeal/ 412. Wrong paramters")
        res.json({"message" : "Een of meer properties in de request body ontbreken of zijn foutief"})
        res.status(412);
        res.end();
        connection.end()
        return;
    }


    var newMeal={
        "Naam": meal.Naam,
        "Beschrijving": meal.Beschrijving,
        "Ingredienten": meal.Ingredienten,
        "Allergie": meal.Allergie,
        "Prijs": meal.Prijs,
        "UserID": meal.UserID,
        "StudentenhuisID": meal.StudentenhuisID
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

      res.send({
        "code":200,
        "success":"meal registered sucessfully"
          });
          res.end();
          connection.connection.end();
    }
    });
  }