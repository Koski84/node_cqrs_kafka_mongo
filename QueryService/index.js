require('dotenv').config();
const MongoClient = require("mongodb").MongoClient;
const express = require('express');

const app = express();

const port = process.env.PORT;
const connection_url = process.env.CONNECTION_URL;
const database_name = process.env.DATABASE_NAME;
const collection_name = process.env.COLLECTION_NAME;
var collection;

app.listen(port, () => {
  console.log('Listening port ' + port)
  
  MongoClient.connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => 
  {
    if(error) 
      throw error;
    
    let database = client.db(database_name);
    collection = database.collection(collection_name);
    
    console.log("Connected to `" + database_name + "`, collection + " + collection_name);
  });
});

app.get('/', (req, res) => {
  collection.find({}).toArray((err, result) => {
      if(err) 
        return res.status(500).send(err);

      res.send(result);
    });
});