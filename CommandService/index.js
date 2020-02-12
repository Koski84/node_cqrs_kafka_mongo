require('dotenv').config('.env');
const body_parser = require('body-parser');
const kafka = require('./kafkaProducer');

const express = require('express')
const app = express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

const port = process.env.PORT;
const kafka_topic = process.env.KAFKA_TOPIC
const kafka_producer = new kafka.KafkaProducer(process.env.KAFKA_HOST, process.env.KAFKA_PORT);

app.listen(port, () => console.log('Listening port ' + port));

app.post('/consumption', (request, response) => {
  kafka_producer.send(kafka_topic, request.body);
  response.send('$_$');
});
