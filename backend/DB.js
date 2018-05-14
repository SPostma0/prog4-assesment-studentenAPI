var mysql = require('mysql');
class DB {

    constructor(){ 
    var HOST = "colt.softether.net";
    var USER = "studentenhuis_user";
    var PASS = "kommaarmetjerainbowtable";
    var DB = "studentenhuis";


        this.connection = mysql.createConnection({
            host     : HOST,
            user     : USER,
            password : PASS,
            database : DB
        })

        this.connection.connect(function(err){

            if(!err) {            
            } else {
                console.log("Constructor//DB FAILURE");
            }
            });
    };
    end(){
        this.connection.end();
    }

}

module.exports = DB;












