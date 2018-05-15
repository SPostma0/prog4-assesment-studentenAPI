


class User {
/////////////////////////////
////////////CONSTRUCTOR//////
/////////////////////////////
    constructor(Voornaam, Achternaam, Email, Wachtwoord){
    
    try{
       //assertions here
    }catch(ex){
        throw(new ApiError(ex.toString(), 422))
    }
 
        this.Wachtwoord = Wachtwoord;
        this.Voornaam = Voornaam;
        this.Achternaam = Achternaam;
        this.Email = Email;
    
    }
 

}
module.exports = User;