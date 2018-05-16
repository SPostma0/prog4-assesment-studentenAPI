const ApiError = require('./ApiError')

class Studentenhuis {
/////////////////////////////
////////////CONSTRUCTOR//////
/////////////////////////////
    constructor(Naam, Adres, UserID){
    
        //todo asserts
    try{
        assert(typeof (naam) === 'string', "Name must be a string");
        assert(typeof (adres) === 'string', "Adress must be a string");
        assert(naam.trim().length > 2, "Name has to be atleast 3 characters");
        assert(adres.trim().length > 2, "Adress has to be atleast 3 characters");
    }catch(ex){
        throw(new ApiError(ex.toString(), 422))
    }
 
      this.Naam= Naam;
      this.Adres= Adres;
      this.UserID = UserID;
    
}

}
module.exports = Studentenhuis;