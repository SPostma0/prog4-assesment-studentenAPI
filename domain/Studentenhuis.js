const ApiError = require('./ApiError')

class Studentenhuis {
/////////////////////////////
////////////CONSTRUCTOR//////
/////////////////////////////
    constructor(Naam, Adres, UserID){
        const assert = require('assert');
    
        //todo asserts

        assert(typeof (Naam) === 'string', "Naam must be a string");
        assert(typeof (Naam) != null, 'Naam cant be null');
        assert(typeof (Adres) === 'string', "Adress must be a string");
        assert(typeof (Adres) != null, 'Adres cant be null');
        assert(Naam.trim().length > 2, "Name has to be atleast 3 characters");
        assert(Adres.trim().length > 2, "Adress has to be atleast 3 characters");

 
      this.Naam= Naam;
      this.Adres= Adres;
      this.UserID = UserID;
    
}

}
module.exports = Studentenhuis;