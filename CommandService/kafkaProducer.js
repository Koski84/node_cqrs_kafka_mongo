const kafka = require('kafka-node');

class KafkaProducer {
  constructor(host, port) {
    console.log(`Connecting to kafka ${host}:${port}`);
    let kafka_options = { kafkaHost: `${host}:${port}` };
    this.client = new kafka.KafkaClient(kafka_options);
  }

  send(kafka_topic, msg) {
    let producer = new kafka.Producer(this.client);
    let payloads = [
      {
        topic: kafka_topic,
        messages: msg
      }
    ];

    producer.send(payloads, (err, data) => {
      if (err) {
        console.error(err);
        console.error('[kafkaProducer -> '+ kafka_topic +']: broker update failed');
      } else {
        console.log('[kafkaProducer -> '+ kafka_topic +']: broker update success');
      }
    });
  
    producer.on('error', function(err) {
      console.error(err);
      console.error('[kafkaProducer -> '+ kafka_topic +']: connection errored');
      throw err;
    });
  }
}

exports.KafkaProducer = KafkaProducer;


