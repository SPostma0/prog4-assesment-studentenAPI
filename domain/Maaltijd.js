module.exports = class Maaltijd {



    constructor(Naam, Beschrijving, Ingredienten, Allergie, Prijs, UserID, StudentenhuisID){

    const assert = require('assert')

      //const ApiError = require('./ApiError')
      //const ApiError = require('./ApiError')

    
     try{
         assert(typeof (Naam) === 'string', 'Naam must be a string');
         assert(typeof (Beschrijving) === 'string', 'Beschrijving must be a string');
        assert(typeof (Ingredienten) === 'string', 'Ingredienten must be an array');
        assert(typeof (Allergie) === 'string', 'Allergie must be an array');
        assert(typeof (UserID) === 'string', 'UserID must be a String');
        assert(typeof (StudentenhuisID) === 'string', 'StudentenhuisID must be a String');
        assert(Naam.trim().length > 2, 'Naam should be atleast 3 chars');
        assert(Beschrijving.trim().length > 7, 'Beschrijving should be atleast 8 chars');
        assert(Ingredienten.trim().length > 3, 'A dish needs atleast 2 ingredients');
        assert(Prijs > 0, 'Price has to be above 0')



    this.Naam = Naam.trim();
    this.Beschrijving = Beschrijving.trim();
    this.Ingredienten = Ingredienten.trim();
    this.Allergie = Allergie.trim();
    this.Prijs = Prijs;;
    this.UserID = UserID.trim();
    this.StudentenhuisID = StudentenhuisID.trim();


    }catch(ex){

        // console.log(ex.toString());
      throw(new ApiError(ex, 422))
  return;
    }
}}
