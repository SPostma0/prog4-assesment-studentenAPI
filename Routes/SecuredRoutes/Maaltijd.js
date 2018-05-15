exports.registermeal = function (req, res) {
    console.log("register meal router called");
    var mysql = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Maaltijd = require('./../../domain/Maaltijd');

    //checking input fields
    var pad = req.path.split('/');

    ////Creating set from User
    var meal = new Maaltijd(req.body.Naam, req.body.Beschrijving, req.body.Ingredienten, req.body.Allergie, req.body.Prijs, req.body.UserID, pad[3]);
    console.log(JSON.stringify(req.body));

    if (meal.Naam == null || meal.Beschrijving == null || meal.Ingredienten == null || meal.Allergie == null || meal.Prijs == null || meal.UserID == null || meal.StudentenhuisID == null) {
        console.log("/registermeal/ 412. Wrong paramters")
        res.json({"message": "Een of meer properties in de request body ontbreken of zijn foutief"})
        res.status(412);
        res.end();
        connection.end()
        return;
    }


    var newMeal = {
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
            console.log("The following error occured: ", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
            res.end();

            connection.connection.end();
        } else {

            res.send({
                "code": 200,
                "success": "meal registered sucessfully"
            });
            res.end();
            connection.connection.end();
        }
    });
}


exports.getMeals = function (req, res) {
    console.log("get all meals router called");
    var mysql = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Maaltijd = require('./../../domain/Maaltijd');

    //Get all meals
    var pad = req.path.split('/');

    connection.connection.query('SELECT * FROM maaltijd WHERE StudentenhuisID ="' + pad[3] + '" ;', function (error, results, fields) {
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

                maaltijdje = new Maaltijd(element.Naam, element.Beschrijving, element.Ingredienten, element.Allergie, element.Prijs, "" + element.UserID, "" + element.StudentenhuisID);
            responsearray.push(maaltijdje);
        })
            ;


            res.json(responsearray);

            res.end();
            connection.connection.end();
        }
    });
}


exports.getSpecificMeal = function (req, res) {
    console.log("get specific meal router called");
    var mysql = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Maaltijd = require('./../../domain/Maaltijd');

    /////split path naar array.
    var pad = req.path.split('/');


    //zoek maaltijd welke bij opgegeven maaltijdID hoort.
    connection.connection.query('SELECT * FROM maaltijd WHERE StudentenhuisID ="' + pad[3] + '" AND ID = "' + pad[5] + '" ;', function (error, results, fields) {
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
                    maaltijdje = new Maaltijd(element.Naam, element.Beschrijving, element.Ingredienten, element.Allergie, element.Prijs, "" + element.UserID, "" + element.StudentenhuisID);
                responsearray.push(maaltijdje);
            })
                ;


                res.json(responsearray);

                res.end();
                connection.connection.end();
            }
            else {

                res.status(404);
                res.json({
                    "message": "Niet gevonden (maaltijd ID bestaat niet)"
                })


            }
        }
    });
}


exports.putMeal = function (req, res) {
    console.log("put meal router called");
    var mysql = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var Maaltijd = require('./../../domain/Maaltijd');
    var jwt = require('jsonwebtoken');
    var Security = require('./../../Security');

    //Get values for the new house


    var pad = req.path.split('/');
    var houseID = pad[3];
    var maaltijdID = pad[5];

    var maaltijdNaam = req.body.Naam;
    var maaltijdBeschrijving = req.body.Beschrijving;
    var maaltijdIngredienten = req.body.Ingredienten;
    var maaltijdAllergie = req.body.Allergie;
    var maaltijdPrijs = req.body.Prijs;
    var maaltijdUserID = req.body.userid;

    meal = new Maaltijd(maaltijdNaam, maaltijdBeschrijving, maaltijdIngredienten, maaltijdAllergie, maaltijdPrijs, "" + maaltijdUserID, "" + houseID);

    console.log(JSON.stringify(meal));


    if (meal.Naam == null || meal.Beschrijving == null || meal.Ingredienten == null || meal.Allergie == null || meal.Prijs == null || meal.UserID == null || meal.StudentenhuisID == null) {
        console.log("/putMeal/ 412. Wrong paramters")
        res.json({"message": "Een of meer properties in de request body ontbreken of zijn foutief"})
        res.status(412);
        res.end();
        connection.end()
        return;
    }


    ///////@TODO VALIDATE TOKEN


    connection.connection.query('UPDATE maaltijd SET Naam = "' + meal.Naam + '" , Beschrijving = "' + meal.Beschrijving + '", Allergie = "' + meal.Allergie + '", Prijs = "' + meal.Prijs + '", Ingredienten = "' + meal.Ingredienten + '" WHERE studentenhuisID ="' + meal.StudentenhuisID + '" AND ID = "' + maaltijdID + '";', function (error, results, fields) {
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
                "success": "Meal updated sucessfully"
            });
            res.end();
            connection.connection.end();
        }
    });
}


exports.deleteMeal = function (req, res) {
    console.log("delete meal router called");
    var mysql = require('mysql');
    var db = require('./../../DB');
    var connection = new db;
    var jwt = require('jsonwebtoken');
    var Security = require('./../../Security');

    var pad = req.path.split('/');
    var houseId = pad[3];
    var maaltijdID = pad[5]


    ///////@TODO VALIDATE TOKEN


    connection.connection.query('DELETE FROM maaltijd WHERE ID = "' + maaltijdID + '" AND studentenhuisID = "' + houseId + '";', function (error, results, fields) {
        if (error) {
            console.log("The following error occured: " + error);
            res.send({
                "code": 400,
                "failed": "Mag deze niet verwijderen"
            })
            res.end();
            connection.connection.end();
        } else {

            res.send({
                "code": 200,
                "success": "Opperation Succesfull"
            });
            res.end();
            connection.connection.end();
        }
    });
}

