"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.get('/', function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Greeting!');
});


restService.post("/echo", function(req, res) {
	return res.json({
    'tset':'test'
  });
  /*var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });*/
});

restService.listen(process.env.PORT || 3000, function() {
  console.log("Server up and listening");
});
