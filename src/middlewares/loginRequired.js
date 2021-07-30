module.exports = (req, res, next) => {
  if (!req.session.user) {
    req.flash('errors', 'Login necessário.');
    req.session.save(() => res.redirect('/login'));
    return;
  }

  next();
};
