//DEPENDENCIES
var express = require('express');

//Initialize Express.js
var app = express();

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