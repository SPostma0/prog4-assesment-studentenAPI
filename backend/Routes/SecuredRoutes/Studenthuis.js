exports.registerhouse= function(req,res){
    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Studentenhuis = require('./../../domain/Studentenhuis');

    //Get values for the new house
    var house = new Studentenhuis(req.body.Naam, req.body.Adres, req.body.UserID);

    if(house.Naam == null || house.Adres == null || house.UserID == null){
        console.log("/registerHouse/ 412. Wrong paramters")
        res.json({"message" : "Een of meer properties in de request body ontbreken of zijn foutief"})
        res.status(412);
        res.end();
        connection.end()
        return;
    }


    var newHouse = {
        "Naam": house.Naam,
        "Adres": house.Adres,
        "UserID": house.UserID
    }
    console.log("We got newHouse values: "+ JSON.stringify(newHouse));

    connection.connection.query('INSERT INTO studentenhuis SET ?', newHouse, function(error,results,fields){
        if(error){
            console.log("The following error occured: "+ error);
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
    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Studentenhuis = require('./../../domain/Studentenhuis');

    //Get all houses

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

             var responsearray = [];

            results.forEach(element => {
                
                huisje = new Studentenhuis(element.Naam, element.Adres, element.UserID);
                responsearray.push(huisje);
            });


            res.json(responsearray);

            res.end();
            connection.connection.end();
        }
    });
}


exports.getSpecificHouse= function(req,res){
    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Studentenhuis = require('./../../domain/Studentenhuis');

    /////split path naar array.
    var pad = req.path.split('/');
    
    
    
        //zoek huis welke bij opgegeven huisid hoort.
    connection.connection.query('SELECT * FROM studentenhuis WHERE ID ="' + pad[3] +'";' , function(error,results,fields){
        if(error){
            console.log("The following error occured: "+ error);
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
            res.end();
            connection.connection.end();
        } else {
                    ////als array grote is 1, teruggeven. Anders 400
            if(results.length === 1){
                var responsearray = [];

                results.forEach(element => {
                    huisje = new Studentenhuis(element.Naam, element.Adres, element.UserID);
                    responsearray.push(huisje);
                });


                res.json(responsearray);

                res.end();
                connection.connection.end();}
                else{

                        res.status(404);
                        res.json({
                            "message": "Niet gevonden (huisId bestaat niet)"
                        })


                }
        }
    });
}


exports.putHouse= function(req,res){
    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Studentenhuis = require('./../../domain/Studentenhuis');
    var jwt = require('jsonwebtoken');
    var Security = require('./../../Security');

    //Get values for the new house
    var house = new Studentenhuis(req.body.Naam, req.body.Adres);  
    var pad = req.path.split('/');
    var houseID = pad[3];

    if(house.Naam == null || house.Adres == null){
        console.log("/puthouse/ 412. Wrong paramters")
        res.json({"message" : "Een of meer properties in de request body ontbreken of zijn foutief"})
        res.status(412);
        res.end();
        connection.end()
        return;
    }


   ///////@TODO VALIDATE TOKEN
      


    connection.connection.query('UPDATE studentenhuis SET Naam = "' + house.Naam + '" , Adres = "' + house.Adres + '" WHERE studentenhuis.ID ="' + houseID + '";',  function(error,results,fields){
        if(error){
            console.log("The following error occured: "+ error);
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
            res.end();
            connection.connection.end();
        } else {

            res.send({
                "code":200,
                "success":"StudentHouse updated sucessfully"
            });
            res.end();
            connection.connection.end();
        }
    });
}


exports.deleteHouse= function(req,res){
    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Studentenhuis = require('./../../domain/Studentenhuis');
    var jwt = require('jsonwebtoken');
    var Security = require('./../../Security');

        var pad = req.path.split('/');
        var houseId = pad[3];
        console.log('Trying to remove house: ' + houseId);


    

   ///////@TODO VALIDATE TOKEN
      


    connection.connection.query('DELETE FROM studentenhuis WHERE ID = ' + houseId + ';',  function(error,results,fields){
        if(error){
            console.log("The following error occured: "+ error);
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
            res.end();
            connection.connection.end();
        } else {

            res.send({
                "code":200,
                "success":"Opperation Succesfull"
            });
            res.end();
            connection.connection.end();
        }
    });
}

