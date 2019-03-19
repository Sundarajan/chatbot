var express = require('express'),
    app     = express(),
    morgan  = require('morgan');

const bodyParser = require("body-parser");
    
app.use(morgan('combined'));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';	
    

app.get('/', function (req, res) {
     // res.writeHead(200, {'Content-Type': 'text/plain'});
	  res.end('Greetings');
});
app.post("/", function(req, res) {
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "test-sample"
  });
});



// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
