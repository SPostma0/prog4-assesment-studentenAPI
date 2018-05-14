/////////////////////////////
/////////////////////////////
//////// CONFIG
////////
//////// LISTEN PORT
const LISTEN_PORT = 3000
////////
//////// MYSQL HOST
const MYSQL_HOST = "localhost";
////////
//////// MYSQL USER
const MYSQL_USER = "user";
////////
//////// MYSQL PASSWORD
const MYSQL_PASSWORD = "";
////////
//////// MYSQL DB NAME
const MYSQL_DB_NAME = "node"
////////
////////
////////






var express    = require("express");
var login = require('./routes/loginroutes');
var data = require('./routes/dataroutes')
var bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : MYSQL_HOST,
  user     : MYSQL_USER,
  password : MYSQL_PASSWORD,
  database : MYSQL_DB_NAME
});

connection.connect(function(err){
if(!err) {
    console.log("DB SELFTEST: DB CONNECTION Oki Doki");
} else {
    console.log("DB SELFTEST: DB CONNECTION FAILED");
}
});

app.use('*', function (req, res, next){
    console.log('Base endpoint')

	next();
})


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();


// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});

//route to handle user registration
//router.post('//     API PATH            //',//   ROUTER.FUNCTION       //);

app.use('/api', router);


connection.end();


app.listen(PORT, () => {
	console.log('Listening on port: ' + PORT)
})



