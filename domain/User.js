

    const bcrypt = require('bcrypt');
    const saltRounds = 25;

class User {

    constructor(Voornaam, Achternaam, Email, Wachtwoord){
    
    try{
        assert(typeof(Voornaam)==='string', 'Voornaam must be a string!');
        assert(typeof(Achternaam)==='string', 'Achternaam must be a string!');
        assert(typeof(Email)==='string', 'E-mail must be a string!');
        assert(typeof(Wachtwoord)==='string', 'Wachtwoord must be a string!');
    }catch(ex){
        throw(new ApiError(ex.toString(), 422))
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