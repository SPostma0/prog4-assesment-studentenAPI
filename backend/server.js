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


var Studenthuis = require('./Routes/SecuredRoutes/Studenthuis');
var Maaltijd = require('./Routes/SecuredRoutes/Maaltijd');


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
app.use('/api/protected/*', Security.ensureToken, (req, res, next) =>{
    jwt.verify(req.token, Security.secret, function(err, data) {
      if (err) {
        res.sendStatus(403);
      } else {
        next();
        ;      }
    });
  })
  
////////ROUTE CONNECTIONS//////
router.post('/public/register', RegisterRouter.register);
router.post('/public/login', LoginRouter.login)

router.post('/protected/studentenhuis', Studenthuis.registerhouse);
router.get('/protected/studentenhuis', Studenthuis.getHouses);
router.get('/protected/studentenhuis/*/', Studenthuis.getSpecificHouse);
router.put('/protected/studentenhuis/*/', Studenthuis.putHouse);
router.delete('/protected/studentenhuis/*/', Studenthuis.deleteHouse);


router.post('/protected/RegisterMeal', Maaltijd.registermeal);

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



