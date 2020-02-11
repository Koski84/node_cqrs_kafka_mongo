const kafka = require('kafka-node');

class KafkaProducer {
  constructor(host, port) {
    console.log(`Conectando con kafka en ${host}:${port}`);
    this.client = new kafka.KafkaClient({ kafkaHost: `${host}:${port}` });
  }

  Send(kafka_topic, msg) {
    this.client = new kafka.KafkaClient();
    let producer = new kafka.Producer(this.client);
    let payloads = [
      {
        topic: kafka_topic,
        messages: msg
      }
    ];

    producer.on('ready', async function() {
      let push_status = producer.send(payloads, (err, data) => {
        if (err) {
          console.error(err);
          console.error('[kafkaProducer -> '+ kafka_topic +']: broker update failed');
        } else {
          console.log('[kafkaProducer -> '+ kafka_topic +']: broker update success');
        }
      });
    });
  
    producer.on('error', function(err) {
      console.error(err);
      console.error('[kafkaProducer -> '+ kafka_topic +']: connection errored');
      throw err;
    });
  }
}

exports.KafkaProducer = KafkaProducer;


