exports.secret = 'rainbowinthesky';

exports.ensureToken = function ensureToken(req, res, next) {

    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(401);
    }
  }


  exports.decodeToken =  function url_base64_decode(req, res, next) {

    var atob = require('atob');

    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];

      str = bearerToken;
      
    //  console.log("Dit is le token: "+ bearerToken);
    }

    var output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    var result = atob(output); 
    
    try{
     return decodeURIComponent(escape(result));
    } catch (err) {
     // console.log(result);
      
     tokenArray =  result.split('{');

     phase1 = tokenArray[3];
     phase2 = '{' + phase1.split('}')[0] + '}' 
      return phase2;
    }
  }


