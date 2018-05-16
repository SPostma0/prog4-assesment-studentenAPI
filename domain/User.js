


exports.user = class User {
    
/////////////////////////////
////////////CONSTRUCTOR//////
/////////////////////////////
    constructor(Voornaam, Achternaam, Email, Wachtwoord){
        var bcrypt = require('bcrypt');
        var Security = require('./../Security');
        const assert = require('assert')
        const validator = require('validator');
        
        
        
        this.Wachtwoord = exports.hashIt(Wachtwoord);


        assert(typeof (Voornaam) === 'string', 'Naam must be a string');
        assert(typeof (Achternaam) === 'string', 'Achternaam must be a string');
        assert(typeof (Email) === 'string', 'Email must be a string');
        assert(typeof (Wachtwoord) === 'string', 'Wachtwoord must be an array');
        assert(Email.trim().length > 5, 'Email should be atleast 6 chars');
        assert(Voornaam.trim().length > 2, '1stName is atleast 3 characters');
        assert(Achternaam.trim().length > 2, 'lastName is atleast 3 characters');
        assert(validator.isEmail(Email), 'email dit not pass validation');


        console.log(this.Wachtwoord);

        this.Voornaam = Voornaam;
        this.Achternaam = Achternaam;
        this.Email = Email;
 
        
    }
 

    
}
 




exports.hashIt = function(Wachtwoord){
    var bcrypt = require('bcrypt');
    var Security = require('./../Security');

    var hash = bcrypt.hashSync(Wachtwoord, Security.saltrounds);
    return hash;
}


