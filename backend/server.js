/////////////////////////////
/////////////////////////////
/////////CONFIG//////////////
/////////////////////////////
/////////LISTEN PORT/////////
const PORT = process.env.PORT || 3000;
/////////////////////////////

/////////////////////////////
/////////////REQUIRE/////////
/////////////////////////////


////MODULES
var express    = require("express");
var bodyParser = require('body-parser');
var mysql      = require('mysql');

var Connection = require('./DB');


////ROUTERS
var RegisterRouter = require('./Routes/PublicRoutes/Register');
var LoginRouter = require('./Routes/PublicRoutes/Login');



/////////////////////////////
////////////APP INIT/////////
/////////////////////////////
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var router = express.Router();

/////////////////////////////
///////////DB INIT///////////
/////////////////////////////
conn = new Connection();
conn.end();






////////////SETUP HEADER////////////
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});




//////////CATCH ALL/////////
app.use('*', function (req, res, next){
    console.log('Start endpoint')

	next();
})



////////SECURITY///////////////
app.get('api/protected', ensureToken, function(req, res)){
    
}

////////ROUTE CONNECTIONS//////

router.post('/register', RegisterRouter.register);
router.post('/login', LoginRouter.login)

app.use('/api', router);


//////////CATCH FINAL/////////
app.use('*', function (req, res, next){
    console.log('End endpoint')
    res.json({ message: 'Nothing here' });
    res.status(404);
    res.end();
    Next();
})





app.listen(PORT, () => {
	console.log('Listening on port: ' + PORT)
})



