exports.registerhouse = function (req, res) {
    console.log("register house router called");
    var mysql = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Studentenhuis = require('./../../domain/Studentenhuis');
    var Security = require('./../../Security');


    ////Decode token and get userid from it
    decodedToken = Security.decodeToken(req, res);

    UserID = JSON.parse(decodedToken).id;

    //Get values for the new house
    var house = new Studentenhuis(req.body.Naam, req.body.Adres, UserID);

    if (house.Naam == null || house.Adres == null || house.UserID == null) {
        console.log("/registerHouse/ 412. Wrong paramters")
        res.json({"message": "Een of meer properties in de request body ontbreken of zijn foutief"})
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
    console.log("We got newHouse values: " + JSON.stringify(newHouse));

    connection.connection.query('INSERT INTO studentenhuis SET ?', newHouse, function (error, results, fields) {
        if (error) {
            console.log("The following error occured: " + error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
            res.end();
            connection.connection.end();
        } else {

            res.send({
                "code": 200,
                "success": "StudentHouse registered sucessfully"
            });
            res.end();
            connection.connection.end();
        }
    });
}

exports.getHouses = function (req, res) {
    console.log("get all houses router called");
    var mysql = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Studentenhuis = require('./../../domain/Studentenhuis');

    //Get all houses

    connection.connection.query('SELECT * FROM studentenhuis', function (error, results, fields) {
        if (error) {
            console.log("The following error occured: " + error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
            res.end();
            connection.connection.end();
        } else {

            var responsearray = [];

            results.forEach(element = > {

                huisje = new Studentenhuis(element.Naam, element.Adres, element.UserID);
            responsearray.push(huisje);
        })
            ;


            res.json(responsearray);

            res.end();
            connection.connection.end();
        }
    });
}


exports.getSpecificHouse = function (req, res) {
    console.log("get specific router called");
    var mysql = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Studentenhuis = require('./../../domain/Studentenhuis');

    /////split path naar array.
    var pad = req.path.split('/');


    //zoek huis welke bij opgegeven huisid hoort.
    connection.connection.query('SELECT * FROM studentenhuis WHERE ID ="' + pad[3] + '";', function (error, results, fields) {
        if (error) {
            console.log("The following error occured: " + error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
            res.end();
            connection.connection.end();
        } else {
            ////als array grote is 1, teruggeven. Anders 400
            if (results.length === 1) {
                var responsearray = [];

                results.forEach(element = > {
                    huisje = new Studentenhuis(element.Naam, element.Adres, element.UserID);
                responsearray.push(huisje);
            })
                ;


                res.json(responsearray);

                res.end();
                connection.connection.end();
            }
            else {

                res.status(404);
                res.json({
                    "message": "Niet gevonden (huisId bestaat niet)"
                })


            }
        }
    });
}


exports.putHouse = function (req, res) {
    console.log("put house router called");
    var mysql = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Studentenhuis = require('./../../domain/Studentenhuis');
    var jwt = require('jsonwebtoken');
    var Security = require('./../../Security');


    ////Decode token and get userid from it
    decodedToken = Security.decodeToken(req, res);

    UserID = JSON.parse(decodedToken).id;


    //Get values for the new house
    var house = new Studentenhuis(req.body.Naam, req.body.Adres);
    var pad = req.path.split('/');
    var houseID = pad[3];


    ///////Validate Parameterts
    if (house.Naam == null || house.Adres == null) {
        console.log("/puthouse/ 412. Wrong paramters")
        res.json({"message": "Een of meer properties in de request body ontbreken of zijn foutief"})
        res.status(412);
        res.end();
        connection.end()
        return;
    } else {
        console.log('Paramters correct');
    }

    /////////////////////////Check if house and id match up
    connection.connection.query('SELECT * FROM studentenhuis WHERE ID = "' + houseID + '" AND UserID = "' + UserID + '";', function (error, results, fields) {
        /////////IN GEVAL DB ERROR
        if (error) {
            console.log("/PutHouse/ Error occured" + error);

            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
            res.end();
            connection.connection.end();
            return;
        } else {
            //////////////Check if amount of rows makes sense
            if (results.length === 1) {

                /////////////////Update the record
                connection.connection.query('UPDATE studentenhuis SET Naam = "' + house.Naam + '" , Adres = "' + house.Adres + '" WHERE studentenhuis.ID ="' + houseID + '";', function (error, results, fields) {
                    if (error) {
                        console.log("The following error occured: " + error);
                        res.send({
                            "code": 400,
                            "failed": "error ocurred"
                        })
                        res.end();
                        connection.end();
                        return;

                    } else {
                        res.send({
                            "code": 200,
                            "success": "StudentHouse updated sucessfully"
                        });
                        connection.end();
                        res.end();
                        return;
                    }
                });
                //////////If auth failure
            } else {
                connection.end();
                console.log('/update house/ auth fail');
                res.send({
                    "message": "Authentication fail"
                });
            }
            return;
        }
    });

}


exports.deleteHouse = function (req, res) {
    console.log("delete house router called");
    var mysql = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Studentenhuis = require('./../../domain/Studentenhuis');
    var jwt = require('jsonwebtoken');
    var Security = require('./../../Security');


    ////Decode token and get userid from it
    decodedToken = Security.decodeToken(req, res);

    UserID = JSON.parse(decodedToken).id;


    //Get values for the new house
    var pad = req.path.split('/');
    var houseID = pad[3];


    /////////////////////////Check if house and id match up
    connection.connection.query('SELECT * FROM studentenhuis WHERE ID = "' + houseID + '" AND UserID = "' + UserID + '";', function (error, results, fields) {
        /////////IN GEVAL DB ERROR
        if (error) {
            console.log("/deletehouse/ Error occured" + error);

            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
            res.end();
            connection.connection.end();
            return;
        } else {
            //////////////Check if amount of rows makes sense
            if (results.length === 1) {

                /////////////////Update the record
                connection.connection.query('DELETE FROM studentenhuis WHERE ID = "' + houseID + '" AND UserID = "' + UserID + ';', function (error, results, fields) {
                    if (error) {
                        console.log("The following error occured: " + error);
                        res.send({
                            "code": 400,
                            "failed": "error ocurred"
                        })
                        res.end();
                        connection.end();
                        return;

                    } else {
                        res.send({
                            "code": 200,
                            "success": "StudentHouse updated deleted"
                        });
                        connection.end();
                        res.end();
                        return;
                    }
                });
                //////////If auth failure
            } else {
                connection.end();
                console.log('/delete house/ auth fail');
                res.status(409);
                res.send({
                    "message": "Authentication fail"
                });
            }
            return;
        }
    });
}

