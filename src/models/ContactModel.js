const Mongo = require('../db/MongoUtils');
const validator = require('validator');
const { ObjectId } = require('mongodb');

module.exports = class Contact {
  constructor({ name, email, phone }, uid) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.uid = uid;
    this.errors = [];
    this.contact = null;
  }

  static async getAll(uid) {
    const db = Mongo.getDb();
    const col = db.collection('contacts');
    const cursor = await col.find({ uid: uid });

    if ((await cursor.count()) === 0) {
      return [];
    }

    const contacts = await cursor.toArray();
    return contacts;
  }

  static async get(id, uid) {
    const db = Mongo.getDb();
    const col = db.collection('contacts');
    const objId = new ObjectId(id);
    const contact = await col.findOne({ _id: objId, uid: uid });
    return contact;
  }

  static async delete(doc) {
    const db = Mongo.getDb();
    const col = db.collection('contacts');
    await col.deleteOne(doc);
  }

  cleanUp() {
    for (const key in this) {
      if (typeof key !== 'string') this[key] = '';
    }

    this.name = this.name;
    this.password = this.password;
    this.phone = this.phone;
  }

  validate() {
    if (!this.name) this.errors.push('Nome é obrigatório.');

    if (this.email && !validator.isEmail(this.email))
      this.errors.push('E-mail inválido');

    if (!this.email && !this.phone)
      this.errors.push(
        'Ao menos um meio de contato deve ser fornecido: e-mail ou telefone.'
      );
  }

  async create() {
    this.validate();

    if (this.errors.length > 0) return;

    const db = Mongo.getDb();

    this.contact = await db.collection('contacts').insertOne({
      name: this.name,
      email: this.email,
      phone: this.phone,
      uid: this.uid,
      createdAt: Date.now()
    });
  }

  async update(id, uid) {
    this.validate();

    if (this.errors.length > 0) return;

    const db = Mongo.getDb();
    const col = db.collection('contacts');
    const contact = await Contact.get(id, uid);

    if (!contact) return this.errors.push('Contato inexistente.');

    const objId = new ObjectId(id);

    await col.updateOne(
      {
        _id: objId,
        uid: uid
      },
      {
        $set: {
          name: this.name,
          email: this.email,
          phone: this.phone,
          createdAt: Date.now()
        }
      }
    );
  }
};
