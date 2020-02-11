require('dotenv').config('.env');
const express = require('express')
const bodyParser = require('body-parser');
const kafka = require('./kafkaProducer');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT;
const kafkaProducer = new kafka.KafkaProducer(process.env.KAFKA_HOST, process.env.KAFKA_PORT);

app.post('/consumption', (request, response) => {
  console.log(request.body);
  kafkaProducer.Send("consumptions", request.body);
  response.send('$_$');
});

app.listen(port, function () {
  console.log('App iniciada en puerto ' + port);
})