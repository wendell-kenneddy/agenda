const User = require('../models/UserModel');

module.exports = class LoginController {
  static index(req, res) {
    return res.render('login');
  }

  static register(req, res) {
    if (req.session.user) {
      req.flash('errors', 'Efetue logout para criar outra conta.');
      req.session.save(() => res.redirect('/'));
      return;
    }

    return res.render('register');
  }

  static async createUser(req, res) {
    try {
      const user = new User(req.body);

      await user.register();

      if (user.errors.length > 0) {
        req.flash('errors', user.errors);
        req.session.save(() => {
          return res.redirect('back');
        });

        return;
      }

      req.flash(
        'success',
        'Usuário criado com sucesso! Efetue o login para entrar na sua conta.'
      );
      req.session.save(() => {
        return res.redirect('/login');
      });

      return;
    } catch (err) {
      console.log(err);
      return res.redirect('/error');
    }
  }

  static async loginUser(req, res) {
    try {
      const user = new User(req.body);

      await user.login();

      if (user.errors.length > 0) {
        req.flash('errors', user.errors);
        req.session.save(() => {
          return res.redirect('/login');
        });

        return;
      }

      req.flash('success', 'Login efetuado com sucesso!');
      req.session.user = user.user;
      req.session.save(() => {
        return res.redirect('/login');
      });

      return;
    } catch (err) {
      console.log(err);
      return res.redirect('/error');
    }
  }

  static async logout(req, res) {
    req.session.destroy();
    return res.redirect('/');
  }
};
