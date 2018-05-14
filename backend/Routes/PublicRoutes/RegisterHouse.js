exports.registerhouse= function(req,res){
    var mysql      = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Studentenhuis = require('./../../domain/Studentenhuis');

    //Get values for the new house
    var house = new Studentenhuis(req.body.Naam, req.body.Adres, req.body.UserID);

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
            console.log("We queried: "+ results);
            res.send({
                "code":200,
                "success":"StudentHouse registered sucessfully"
            });
            res.end();
            connection.connection.end();
        }
    });
}