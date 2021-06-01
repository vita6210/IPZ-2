//DEPENDENCIES
var express = require('express');
 
//Initialize Express.js 
var app = express();

//JSONP Get Request
app.get('/endpointJSONP', function(req, res){

  //LOG  
  console.log('JSONP response');
  console.log(req.query);
  //JSONP Response (doc: http://expressjs.com/api.html#res.jsonp) 
  res.jsonp(req.query) 
});

//JSON Get Request
app.get('/endpointJSON', function(req, res){
  
  //LOG
    console.log('JSON response');
  console.log(req.query);
  
  //JSON Response
    res.json(req.query);
});
 
//Starting the server 
app.listen(3000);