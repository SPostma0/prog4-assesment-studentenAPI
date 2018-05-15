var currentDate = new Date();

function notAuthorised(res){
    res.status(401).json({
        "message": "Niet geautoriseerd",
        "code": 401,
        "datetime": currentDate
    });
};

function wrongInput(res){
    res.status(412).json({
        "message": "Een of meer properties in de request body ontbreken of zijn foutief",
        "code": 412,
        "datetime": currentDate
    });
};

function notFound(res){
    res.status(404).json({
        "message": "Niet gevonden",
        "code": 404,
        "datetime": currentDate
    });
};

function conflictedChange(res){
    res.status(409).json({
        "message": "Conflict (Gebruiker mag deze data niet wijzigen)",
        "code": 409,
        "datetime": currentDate
    });
};

module.exports = {
    notAuthorised,
    wrongInput,
    notFound,
    conflictedChange
};


