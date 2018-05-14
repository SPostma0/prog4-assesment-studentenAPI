var express = require('express');
var bodyParser = require('body-parser');

let routes = express.Router();

routes.get('/login');
routes.get('/register', function(req,res){

});