

    // const bcrypt = require('bcrypt');
    // const saltRounds = 25;

class Studentenhuis {

    constructor(Naam, Adres, UserID){
    
        //todo asserts
    try{
       //assertions here
    }catch(ex){
        throw(new ApiError(ex.toString(), 422))
    }
 
      this.Naam= Naam;
      this.Adres= Adres;
      this.UserID = UserID;
    
}

setNaam(naam){
    this.Naam = naam;
}
setAdress(adress){
    this.Adres = adress;
}

getNaam(){
    return this.Naam;
}
getAdress(){
    return this.Adres;
}

}
module.exports = Studentenhuis;