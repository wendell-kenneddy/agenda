const ContactModel = require('../models/ContactModel');

module.exports = class HomeController {
  static async index(req, res) {
    try {
      let contacts = [];

      if (req.session.user) {
        const uid = req.session.user._id;
        contacts = await ContactModel.getAll(uid);
      }

      return res.render('index', { contacts });
    } catch (error) {
      console.log(error);
      return res.redirect('error');
    }
  }
};
