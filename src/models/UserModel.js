const Mongo = require('../db/MongoUtils');
const bcrypt = require('bcryptjs');

module.exports = class User {
  constructor({ name, password }) {
    this.name = name;
    this.password = password;
    this.errors = [];
    this.user = null;
  }

  static async findUser(name) {
    const db = Mongo.getDb();
    const col = db.collection('users');
    const user = await col.findOne({ name: name });
    return user;
  }

  cleanUp() {
    for (const key in this) {
      if (typeof key !== 'string') this[key] = '';
    }

    this.name = this.name;
    this.password = this.password;
  }

  validate() {
    this.cleanUp();

    if (!this.name) this.errors.push('Nome necessário.');
    if (!this.password) this.errors.push('Senha necessária.');
    if (this.password.length < 3 || this.password.length > 12)
      this.errors.push('A senha deve conter entre 3 e 12 caracteres.');
  }

  async checkExistentUser() {
    const db = Mongo.getDb();
    const user = await db.collection('users').findOne({ name: this.name });
    if (user) this.errors.push('Usuário já existe.');
  }

  async register() {
    this.validate();

    if (this.errors.length > 0) return;

    await this.checkExistentUser();

    if (this.errors.length > 0) return;

    const db = Mongo.getDb();

    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);

    this.user = await db.collection('users').insertOne({
      name: this.name,
      password: this.password
    });
  }

  async login() {
    this.validate();

    if (this.errors.length > 0) return;

    const db = Mongo.getDb();
    this.user = await db.collection('users').findOne({ name: this.name });

    if (!this.user) return this.errors.push('Usuário inexistente.');

    if (!bcrypt.compareSync(this.password, this.user.password)) {
      this.user = null;
      this.errors.push('Senha inválida');
    }
  }
};
