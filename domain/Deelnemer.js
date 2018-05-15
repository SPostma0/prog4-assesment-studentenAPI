class Deelnemer {

    constructor(UserID, StudentenhuisID, MaaltijdID){
    
    try{
       //assertions here
    }catch(ex){
        throw(new ApiError(ex.toString(), 422))
    }
 
      this.UserID = UserID;
      this.StudentenhuisID = StudentenhuisID;
      this.MaaltijdID = MaaltijdID;
    
} 

}
module.exports = Deelnemer;