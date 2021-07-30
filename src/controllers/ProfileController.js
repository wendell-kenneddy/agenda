const Contact = require('../models/ContactModel');

module.exports = class ProfileController {
  static async index(req, res) {
    const uid = req.session.user._id;
    const contacts = await Contact.getAll(uid);

    return res.render('profile', { total: contacts.length });
  }
};
