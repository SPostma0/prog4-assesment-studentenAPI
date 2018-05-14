module.exports = class Maaltijd {
    constructor(Naam, Omschrijving, Ingredienten, Allergie, Prijs, UserID, StudentenhuisID);

    try{
        assert(typeof (Naam) === 'string', 'Naam must be a string');
        assert(typeof (Omschrijving) === 'string', 'Omschrijving must be a string');
        assert(typeof (Ingredienten) === 'array', 'Ingredienten must be an array');
        assert(typeof (Allergie) === 'array', 'Naam must be an array');
        assert(typeof (Prijs) === 'Number', 'Prijs must be a Number');
        assert(typeof (UserID) === 'string', 'UserID must be a String');
        assert(typeof (StudentenhuisID) === 'string', 'StudentenhuisID must be a String');
        assert(Naam.trim().length > 2, 'Naam should be atleast 3 chars');
        assert(Omschrijving.trim().length > 7, 'Omschrijving should be atleast 8 chars');
        assert(Ingredienten.   length > 1, 'A dish needs atleast 2 ingredients');
        assert(Prijs > 0, 'Price has to be above 0')

    }catch(ex){
        throw(new ApiError(ex.toString(), 422))
    }

    this.Nama = Naam.trim;
    this.Omschrijving = Omschrijving.trim;
    this.Ingredienten = Ingredienten.trim;
    this.Allergie = Allergie.trim;
    this.Prijs = Prijs.trim;
    this.UserID = UserID.trim;
    this.StudentenhuisID = StudentenhuisID.trim;

}
