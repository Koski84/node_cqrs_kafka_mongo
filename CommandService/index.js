require('dotenv').config();
var express = require('express')
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT;

app.post('/consumption', (request, response) => {
  console.log(request.body);
  response.send('$_$');
});

app.listen(port, function () {
  console.log('App iniciada en puerto ' + port);
})