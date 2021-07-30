const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(process.env.MONGOURI);
let db = '';

module.exports = class Mongo {
  static async init() {
    await client.connect();
    db = client.db('agenda');
  }

  static getDb() {
    return db;
  }
};
