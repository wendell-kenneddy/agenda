const Contact = require('../models/ContactModel');
const bcrypt = require('bcryptjs');

module.exports = class ContactController {
  static index(req, res) {
    return res.render('contact', {
      contact: null,
      subject: 'Adicionar Contato'
    });
  }

  static async create(req, res) {
    try {
      const contact = new Contact(req.body, req.session.user._id);

      await contact.create();

      if (contact.errors.length > 0) {
        req.flash('errors', contact.errors);
        req.session.save(() => res.redirect('/contact'));
        return;
      }

      req.flash('success', 'Contato cadastrado com sucesso!');
      req.session.save(() => res.redirect('/'));
      return;
    } catch (err) {
      console.log(err);
      return res.redirect('/error');
    }
  }

  static async delete(req, res) {
    const id = req.params.id;
    if (typeof id !== 'string') return;

    return res.render('delete', { id });
  }

  static async authDelete(req, res) {
    try {
      const id = req.params.id;
      const uid = req.session.user._id;
      const hash = req.session.user.password;
      const password = req.body.password;
      const contact = await Contact.get(id, uid);

      if (!password) {
        req.flash('errors', 'Senha necessária.');
        req.session.save(() => res.redirect('back'));
        return;
      }

      if (!bcrypt.compareSync(password, hash)) {
        req.flash('errors', 'Senha inválida.');
        req.session.save(() => res.redirect('back'));
        return;
      }

      if (!contact) {
        req.flash('errors', 'Contato inexistente.');
        req.session.save(() => res.redirect('back'));
        return;
      }

      await Contact.delete(contact);
      req.flash('success', 'Contato excluído com sucesso!');
      req.session.save(() => res.redirect('/'));
      return;
    } catch (err) {
      console.log(err);
      return res.redirect('/error');
    }
  }

  static async edit(req, res) {
    try {
      const id = req.params.id;
      if (typeof id !== 'string') return;

      const uid = req.session.user._id;
      const contact = await Contact.get(id, uid);

      if (!contact) {
        return res.redirect('/error');
      }

      return res.render('contact', {
        contact,
        subject: 'Editar Contato'
      });
    } catch (err) {
      console.log(err);
      return res.redirect('/error');
    }
  }

  static async authEdit(req, res) {
    try {
      const id = req.params.id;
      if (typeof id !== 'string') return;

      const uid = req.session.user._id;
      const contact = new Contact(req.body);
      await contact.update(id, uid);

      if (contact.errors.length > 0) {
        req.flash('errors', contact.errors);
        req.session.save(() => res.redirect('back'));
        return;
      }

      req.flash('success', 'Contato editado com sucesso!');
      req.session.save(() => res.redirect('back'));
      return;
    } catch (err) {
      console.log(err);
      return res.redirect('/error');
    }
  }
};
