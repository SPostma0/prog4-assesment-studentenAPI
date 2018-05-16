exports.registerhouse= function(req,res){
//////////////////////////////
///////SETUP DEPENDANCIES/////
//////////////////////////////         
    console.log("register house router called");
    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Studentenhuis = require('./../../domain/Studentenhuis'); 
    var Security = require('./../../Security');
    var ApiError = require('.//../../domain/ApiError');

//////////////////////////////
///FETCH UID FROM TOKEN///////
//////////////////////////////  

      decodedToken = Security.decodeToken(req,res);
      UserID = JSON.parse(decodedToken).id;

/////////////////////////////////
///GETDATA FROM BODY/////////////
///////////////////////////////// 
try{
var house = new Studentenhuis(req.body.Naam, req.body.Adres, UserID);
}catch(ex){
    console.log(ex.toString());
    res.status(404).send({"message":"Missing paramters"}).end();

    throw(new ApiError(404, "Wrong paramters: Naam: " + req.body.Naam+"  Adres: " + req.body.Adres + "  " + UserID));

}
    

/////////////////////////////////
///VALIDATING INPUT FIELDS///////
/////////////////////////////////  

    if(house.Naam == null || house.Adres == null || house.UserID == null){
        console.log("/registerHouse/ 412. Wrong paramters")
        res.json({"message" : "Een of meer properties in de request body ontbreken of zijn foutief"})
        res.status(412);
        res.end();
        connection.end()
        return;
    }

/////////////////////////////////
///MAKING SET FOR INSERT/////////
/////////////////////////////////  
    var newHouse = {
        "Naam": house.Naam,
        "Adres": house.Adres,
        "UserID": house.UserID
    }
 //   console.log("We got newHouse values: "+ JSON.stringify(newHouse));


/////////////////////////////////
///INSERTING SET INTO DB/////////
/////////////////////////////////      
    connection.connection.query('INSERT INTO studentenhuis SET ?', newHouse, function(error,results,fields){
        if(error){
         //   console.log("The following error occured: "+ error);
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
            res.end();
            connection.connection.end();
        } else {

            res.send({
                "code":200,
                "success":"StudentHouse registered sucessfully"
            });
            res.end();
            connection.connection.end();
        }
    });
}





exports.getHouses= function(req,res){

//////////////////////////////
///////SETUP DEPENDANCIES/////
//////////////////////////////         

    console.log("get all houses router called");
    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Studentenhuis = require('./../../domain/Studentenhuis');

/////////////////////////////////
///GETALL HOUSES/////////////////
/////////////////////////////////     
    connection.connection.query('SELECT * FROM studentenhuis', function(error,results,fields){
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
///THE RETURN ARRAY//////////////
/////////////////////////////////     
             var responsearray = [];

/////////////////////////////////
///ICYCLE AND FILL ARRAY/////////
/////////////////////////////////                  
            results.forEach(element => {
                
                huisje = new Studentenhuis(element.Naam, element.Adres, element.UserID);
                responsearray.push(huisje);
            });

/////////////////////////////////
///PUSH ARRAY////////////////////
/////////////////////////////////     
            res.json(responsearray);

            res.end();
            connection.connection.end();
        }
    });
}


exports.getSpecificHouse= function(req,res){
//////////////////////////////
///////SETUP DEPENDANCIES/////
//////////////////////////////         

    console.log("get specific router called");
    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Studentenhuis = require('./../../domain/Studentenhuis');

/////////////////////////////////
///SPLITTING PATH FOR DATA///////
/////////////////////////////////  

    var pad = req.path.split('/');
    
/////////////////////////////////
///GET HOUSE FOR HOUSEID/////////
/////////////////////////////////     
    connection.connection.query('SELECT * FROM studentenhuis WHERE ID ="' + pad[3] +'";' , function(error,results,fields){
        if(error){
            console.log("The following error occured: "+ error);
/////////////////////////////////
///400 ERORR/////////////////////
/////////////////////////////////                 
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
            res.end();
            connection.connection.end();
        } else {
////////////////////////////////////
///ARRAY SHOULD BE 1.LENGTH/////////
////////////////////////////////////     
            if(results.length === 1){
                var responsearray = [];

                results.forEach(element => {
                    huisje = new Studentenhuis(element.Naam, element.Adres, element.UserID);
                    responsearray.push(huisje);
                });
////////////////////////////////////
///RETURN JSON WITH 1 HOUSE/////////
////////////////////////////////////     

                res.json(responsearray);
                res.end();
                connection.connection.end();}
                else{
///////////////////////////////////////////
///IF DATA IN ARRAY MAKES NO SENSE/////////
///////////////////////////////////////////   
                        res.status(404);
                        res.json({
                            "message": "Niet gevonden (huisId bestaat niet)"
                        })


                }
        }
    });
}


exports.putHouse= function(req,res){
//////////////////////////////
///////SETUP DEPENDANCIES/////
//////////////////////////////       

    console.log("put house router called");
    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Studentenhuis = require('./../../domain/Studentenhuis');
    var jwt = require('jsonwebtoken');
    var Security = require('./../../Security');


//////////////////////////////
///FETCH UID FROM TOKEN///////
//////////////////////////////  
     decodedToken = Security.decodeToken(req,res);
     UserID = JSON.parse(decodedToken).id;


/////////////////////////////////
///GETTING DATA FROM BODY////////
/////////////////////////////////  

    var house = new Studentenhuis(req.body.Naam, req.body.Adres, ""+UserID); 

/////////////////////////////////
///SPLITTING PATH FOR DATA///////
/////////////////////////////////  

    var pad = req.path.split('/');
    var houseID = pad[3];

/////////////////////////////////
///VALIDATE NOT NULLS////////////
/////////////////////////////////     
    if(house.Naam == null || house.Adres == null){
        console.log("/puthouse/ 412. Wrong paramters")
        res.json({"message" : "Een of meer properties in de request body ontbreken of zijn foutief"})
        res.status(412);
        res.end();
        connection.end()
        return;
    }else{
/////////////////////////////////
///IF NO SHIT PARAM GOOD/////////
///////////////////////////////// 

        console.log('Paramters correct');
    }

///////////////////////////////////
///CHECK WETHER ID'S MATCH/////////
///////////////////////////////////     

  connection.connection.query('SELECT * FROM studentenhuis WHERE ID = "' + houseID + '" AND UserID = "' + UserID + '";',  function (error, results, fields) {

/////////////////////////////////
///INCASE OF ERROR///////////////
/////////////////////////////////   

  if (error) {
    console.log("/PutHouse/ Error occured" + error);

    res.send({
      "code":400,
      "failed":"error ocurred"
    })

    res.end();
    connection.connection.end();
    return;




  }else{
///////////////////////////////////////
///CHECK IF RESULT MAKES SENSE/////////
///////////////////////////////////////     
      if(results.length === 1){
          
//////////////////////////////////////////////
///IF RESULTS MAKE SENSE START UPDATE/////////
//////////////////////////////////////////////      
    connection.connection.query('UPDATE studentenhuis SET Naam = "' + house.Naam + '" , Adres = "' + house.Adres + '" WHERE studentenhuis.ID ="' + houseID + '";',  function(error,results,fields){
  
//////////////////////////////////
///IF ERROR ON UPDATE 400/////////
//////////////////////////////////     
        if(error){
            console.log("The following error occured: "+ error);
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
            res.end();
            connection.end();
            return;
/////////////////////////////////
///IF SUCCESFULL UPDATE//////////
/////////////////////////////////                 
        } else {
            res.send({
                "code":200,
                "success":"StudentHouse updated sucessfully"
            });
            connection.end();
            res.end();
            return;          
        }
    });
//////////////////////////////////////////
///IF UID NO MATCH WITH UID IN DB/////////
//////////////////////////////////////////
      }else{
        connection.end();
            console.log('/update house/ auth fail');
          res.send({
              "message":"Authentication fail"
          });
      }
    return;
  }
  });

}


exports.deleteHouse= function(req,res){
//////////////////////////////
///////SETUP DEPENDANCIES/////
//////////////////////////////         
    console.log("delete house router called");
    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Studentenhuis = require('./../../domain/Studentenhuis');
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

/////////////////////////////////
///GET THE HOUSE/////////////////
///////////////////////////////// 

  connection.connection.query('SELECT * FROM studentenhuis WHERE ID = "' + houseID + '" AND UserID = "' + UserID + '";',  function (error, results, fields) {

//////////////////////////////////////
///IF ERROR ON 1ST STAGE, 400/////////
//////////////////////////////////////    

  if (error) {
    console.log("/deletehouse/ Error occured" + error);

        res.send({
        "code":400,
        "failed":"error ocurred"
        })
    res.end();
    connection.connection.end();
    return;
  }else{

////////////////////////////////////
///CHECK IF DATA MAKES SENSE////////
////////////////////////////////////     
     
if(results.length === 1){
          
/////////////////////////////////////
///IF SO, UPDATE THE RECORD/////////
/////////////////////////////////////    

    connection.connection.query('DELETE FROM studentenhuis WHERE ID = "' + houseID + '" AND UserID = "' + UserID + ';',  function(error,results,fields){
//////////////////////////////////
///IF ERROR ON UPDATE 400/////////
//////////////////////////////////     
        if(error){
            console.log("The following error occured: "+ error);
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
            res.end();
            connection.end();
            return;

//////////////////////////////////////////
///ON SUCCES, GREAT BALLS OF FIRE/////////
/////////////////////////////////////////     
        } else {
            res.send({
                "code":200,
                "success":"StudentHouse updated deleted"
            });
            connection.end();
            res.end();
            return;          
        }
    });
///////////////////////////////////////////////////////
///IF UID ON TOKEN DOESNT MATCH UP WITH DB UID/////////
///////////////////////////////////////////////////////
      }else{
        connection.end();
            console.log('/delete house/ auth fail');
            res.status(409);
          res.send({
              "message":"Authentication fail"
          });
      }
    return;
  }
  });
}

