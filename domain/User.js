


exports.user = class User {
    
/////////////////////////////
////////////CONSTRUCTOR//////
/////////////////////////////
    constructor(Voornaam, Achternaam, Email, Wachtwoord){
        var bcrypt = require('bcrypt');
        var Security = require('./../Security');
    
        

        
        this.Wachtwoord = exports.hashIt(Wachtwoord);

    try{
       //assertions here
    }catch(ex){
        throw(new ApiError(ex.toString(), 422))
    }
 
        console.log(this.Wachtwoord)
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


