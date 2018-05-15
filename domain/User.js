    const bcrypt = require('bcrypt');
    const saltRounds = 25;
    const ApiError = require('./../ApiError');
    const assert = require('assert');

class User {

    constructor(Voornaam, Achternaam, Email, Wachtwoord){
    
    try{
        assert(typeof (Voornaam) === 'string', 'Voornaam must be a string');
        assert(Voornaam.length > 2,'Voornaam must be atleast 3 letters');
        assert(Achternaam.length > 2,'Achternaam must be atleast 3 letters');
        assert(typeof (Achternaam) === 'string', 'Achternaam must be a string');
        assert(typeof (Email) === 'string', 'Email must be a string');
        assert(typeof (Wachtwoord) === 'string', 'Wachtwoord must be a string');
        assert(Wachtwoord.length > 2,'Wachtwoord must be atleast 3 letters');
    }catch(ex){
         throw(new ApiError(ex, 422))
    }
 
      this.Wachtwoord = Wachtwoord;
      this.Voornaam = Voornaam;
      this.Achternaam = Achternaam;
      this.Email = Email;
    
}

setVoornaam(Voornaam){
    this.Voornaam = Voornaam;
}
setAchternaam(Achternaam){
    this.Achternaam = Achternaam;
}
setWachtwoord(Wachtwoord){
    this.Wachtwoord = Wachtwoord;
}
setEmail(Email){
    this.Email = Email;
}

getWachtwoord(){
    return this.Wachtwoord;
}



   

}
module.exports = User;