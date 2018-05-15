



class Studentenhuis {
/////////////////////////////
////////////CONSTRUCTOR//////
/////////////////////////////
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

}
module.exports = Studentenhuis;