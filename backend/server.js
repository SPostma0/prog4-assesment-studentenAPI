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
var Security = require('./Security')
var jwt = require('jsonwebtoken');

////ROUTERS
var RegisterRouter = require('./Routes/PublicRoutes/Register');
var LoginRouter = require('./Routes/PublicRoutes/Login');


var RegisterHouse = require('./Routes/PublicRoutes/RegisterHouse');
var RegisterMeal = require('./Routes/PublicRoutes/RegisterMeal');


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
app.use('/api/protected/*', ensureToken, (req, res, next) =>{
    jwt.verify(req.token, Security.secret, function(err, data) {
      if (err) {
        res.sendStatus(403);
      } else {
        next();
        ;      }
    });
  })
  
////////ROUTE CONNECTIONS//////
router.post('/register', RegisterRouter.register);
router.post('/login', LoginRouter.login)

router.post('/protected/RegisterHouse', RegisterHouse.registerhouse);
router.post('/protected/RegisterMeal', RegisterMeal.registermeal);

app.use('/api', router);


//////////CATCH FINAL/////////
app.use('*', function (req, res, next){
    console.log('End endpoint')
    res.json({ message: 'Nothing here' });
    res.status(404);
    res.end();
})





app.listen(PORT, () => {
	console.log('Listening on port: ' + PORT)
})




function ensureToken(req, res, next) {

    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  }