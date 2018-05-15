
  exports.registermeal = function(req,res){
//////////////////////////////
///////SETUP DEPENDANCIES/////
//////////////////////////////      
    console.log("register meal router called");
    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Maaltijd = require('./../../domain/Maaltijd');
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

    ////Creating set from User
    var meal = new Maaltijd(req.body.Naam, req.body.Beschrijving, req.body.Ingredienten, req.body.Allergie, req.body.Prijs, ""+UserID, pad[3]);
    console.log(JSON.stringify(req.body));

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



  
exports.getMeals= function(req,res){
//////////////////////////////
///////SETUP DEPENDANCIES/////
//////////////////////////////         
  console.log("get all meals router called");
  var mysql      = require('mysql');
  var db = require('./../../DB');
  var connection = new db;
  var Maaltijd = require('./../../domain/Maaltijd');

/////////////////////////////////
///SPLITTING PATH FOR DATA///////
/////////////////////////////////  
  var pad = req.path.split('/');

  connection.connection.query('SELECT * FROM maaltijd WHERE StudentenhuisID ="' + pad[3] + '" ;', function(error,results,fields){
      if(error){
          console.log("The following error occured: "+ error);
          res.send({
              "code":400,
              "failed":"error ocurred"
          })
          res.end();
          connection.connection.end();
      } else {

           var responsearray = [];

          results.forEach(element => {
              
              maaltijdje = new Maaltijd(element.Naam, element.Beschrijving, element.Ingredienten, element.Allergie, element.Prijs, "" + element.UserID, "" + element.StudentenhuisID);
              responsearray.push(maaltijdje);
          });


          res.json(responsearray);

          res.end();
          connection.connection.end();
      }
  });
}


exports.getSpecificMeal= function(req,res){
//////////////////////////////
///////SETUP DEPENDANCIES/////
//////////////////////////////   

  console.log("get specific meal router called");
  var mysql      = require('mysql');
  var db = require('./../../DB');
  var connection = new db;
  var Maaltijd = require('./../../domain/Maaltijd');

/////////////////////////////////
///SPLITTING PATH FOR DATA///////
///////////////////////////////// 

  var pad = req.path.split('/');

/////////////////////////////////
///FIRE QUERY////////////////////
///////////////////////////////// 

  connection.connection.query('SELECT * FROM maaltijd WHERE StudentenhuisID ="' + pad[3] + '" AND ID = "' + pad[5] + '" ;' , function(error,results,fields){
/////////////////////////////////
///ON DB ERROR 400///////////////
/////////////////////////////////   

    if(error){
          console.log("The following error occured: "+ error);
          res.send({
              "code":400,
              "failed":"error ocurred"
          })
          res.end();
          connection.connection.end();
      } else {
////////////////////////////////////////
///IF DATA MAKES NO SENSE 400///////////
///OTHERWISE PUT STUFF IN ARRAY/////////
////////////////////////////////////////
          if(results.length === 1){
              var responsearray = [];
              results.forEach(element => {
                maaltijdje = new Maaltijd(element.Naam, element.Beschrijving, element.Ingredienten, element.Allergie, element.Prijs, "" + element.UserID, "" + element.StudentenhuisID);
                  responsearray.push(maaltijdje);
              });
              res.json(responsearray);
              res.end();
              connection.connection.end();}

/////////////////////////////////
///ON DB ERROR 404///////////////
/////////////////////////////////               
              else{
                      res.status(404);
                      res.json({
                          "message": "Niet gevonden (maaltijd ID bestaat niet)"
                      })
              }
      }
  });
}

    exports.putMeal= function(req,res){
//////////////////////////////
///////SETUP DEPENDANCIES/////
////////////////////////////// 

    console.log("put meal router called");
    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Maaltijd = require('./../../domain/Maaltijd');
    var jwt = require('jsonwebtoken');
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
    var houseID = pad[3];
    var maaltijdID = pad[5];

////////////////////////////////////////////////////////////
///CREATE SET FOR EASY LOCAL ERROR VALIDATION///////////////
////////////////////////////////////////////////////////////
    var maaltijdNaam = req.body.Naam;
    var maaltijdBeschrijving = req.body.Beschrijving;
    var maaltijdIngredienten = req.body.Ingredienten;
    var maaltijdAllergie = req.body.Allergie;
    var maaltijdPrijs = req.body.Prijs;
    var maaltijdUserID =  ""+UserID;
  
/////////////////////////////////////////
///CREATE OBJECT OUT OF IT///////////////
///////////////////////////////////////// 
    meal = new Maaltijd(maaltijdNaam, maaltijdBeschrijving, maaltijdIngredienten,maaltijdAllergie, maaltijdPrijs,"" +  maaltijdUserID,"" +  houseID);
    console.log(JSON.stringify(meal));

/////////////////////////////////
///VALIDATE PARAMS///////////////
///////////////////////////////// 

  if(meal.Naam == null || meal.Beschrijving  == null || meal.Ingredienten  == null || meal.Allergie  == null || meal.Prijs == null || meal.UserID  == null || meal.StudentenhuisID == null){
    console.log("/putMeal/ 412. Wrong paramters")
    res.json({"message" : "Een of meer properties in de request body ontbreken of zijn foutief"})
    res.status(412);
    res.end();
    connection.end()
    return;
}
//////////////////////////////////
///FIRE QUERY AT DB///////////////
////////////////////////////////// 

    connection.connection.query('SELECT * FROM maaltijd WHERE UserID = "' + UserID + '" AND ID = "' + maaltijdID + '";',  function (error, results, fields) {

/////////////////////////////////
///ON DB ERROR 400///////////////
///////////////////////////////// 
    if (error) {
    console.log("/putmeal/ Error occured" + error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
    res.end();
    connection.connection.end();
  }else{
///////////////////////////////////////
///IF AUTH SUCCES UPDATE///////////////
/////////////////////////////////////// 
      if(results.length === 1){
          console.log("Login succesfull")


  connection.connection.query('UPDATE maaltijd SET Naam = "' + meal.Naam + '" , Beschrijving = "' + meal.Beschrijving + '", Allergie = "' + meal.Allergie + '", Prijs = "' + meal.Prijs + '", Ingredienten = "' + meal.Ingredienten + '" WHERE studentenhuisID ="' + meal.StudentenhuisID + '" AND ID = "' + maaltijdID  + '";',  function(error,results,fields){

/////////////////////////////////
///ON DB ERROR 400///////////////
/////////////////////////////////   
    if(error){
          console.log("The following error occured: "+ error);
          res.send({
              "code":400,
              "failed":"error ocurred"
          })
          res.end();
          connection.connection.end();
      } else {
/////////////////////////////////
///SUCCESFULLY UPDATE////////////
///////////////////////////////// 
          res.send({
              "code":200,
              "success":"Meal updated sucessfully"
          });
          res.end();
          connection.connection.end();
      }
  });
/////////////////////////////////
///ON TOKEN UID NOT VALID////////
///////////////////////////////// 
      }else{
          console.log("/putmeal/No token match")
          res.send({message:"Insufficient permission"})
          res.end();
          connection.connection.end();
      }
  }
});
}




exports.deleteMeal= function(req,res){
//////////////////////////////
///////SETUP DEPENDANCIES/////
//////////////////////////////  

  console.log("delete meal router called");
  var mysql      = require('mysql');
  var db = require('./../../DB');
  var connection = new db;
  var jwt = require('jsonwebtoken');
  var Security = require('./../../Security');

/////////////////////////////////
///SPLITTING PATH FOR DATA///////
/////////////////////////////////  

      var pad = req.path.split('/');
      var houseId = pad[3];
      var maaltijdID = pad[5]

//////////////////////////////
///FETCH UID FROM TOKEN///////
////////////////////////////// 

      decodedToken = Security.decodeToken(req,res);
      UserID = JSON.parse(decodedToken).id;

///////////////////////////////////
///GET MEAL FROM DB ///////////////
/////////////////////////////////// 
 connection.connection.query('SELECT * FROM maaltijd WHERE UserID = "' + UserID + '" AND ID = "' + maaltijdID + '"AND StudentenhuisID = "' + houseId + '";',  function (error, results, fields) {

/////////////////////////////////
///ON DB ERROR 400///////////////
///////////////////////////////// 
  if (error) {
    console.log("/deletemeal/ Error occured" + error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
    res.end();
    connection.connection.end();
  }else{
/////////////////////////////////////////////////////////
///IF TOKEN UID = DB.UID FIRE DELETE QUERY///////////////
/////////////////////////////////////////////////////////
      if(results.length === 1){
          console.log("auth succesfull")
  connection.connection.query('DELETE FROM maaltijd WHERE ID = "' + maaltijdID + '" AND studentenhuisID = "' + houseId + '";',  function(error,results,fields){
/////////////////////////////////
///ON DB ERROR 400///////////////
/////////////////////////////////  
    if(error){
          console.log("The following error occured: "+ error);
          res.send({
              "code":400,
              "failed":"Mag deze niet verwijderen"
          })
          res.end();
          connection.connection.end();
      } else {
/////////////////////////////////
///ON SUCCESS////////////////////
///////////////////////////////// 
          res.send({
              "code":200,
              "success":"Deletion succeeded"
          });
          res.end();
          connection.connection.end();
      }
  });
        

/////////////////////////////////////////////
///IF TOKENS DONT MATCH DB.UID///////////////
/////////////////////////////////////////////
      }else{
          console.log("/deletemeal/ didnt pass auth")
          res.send({message:"Invalid permissions"})
          connection.end();
      }
  }
  });
}

