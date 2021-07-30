const express = require('express');
const routes = express.Router();
const HomeController = require('./controllers/HomeController');
const LoginController = require('./controllers/LoginController');
const ContactController = require('./controllers/ContactController');
const ProfileController = require('./controllers/ProfileController');
const loginRequired = require('./middlewares/loginRequired');

// Home

routes.get('/', HomeController.index);

// Profile

routes.get('/profile', loginRequired, ProfileController.index);

// Login

routes.get('/login', LoginController.index);
routes.post('/login', LoginController.loginUser);
routes.get('/logout', LoginController.logout);
routes.get('/login/register', LoginController.register);
routes.post('/login/register', LoginController.createUser);

// Contacts

routes.get('/contact', loginRequired, ContactController.index);
routes.post('/contact', loginRequired, ContactController.create);
routes.get('/contact/delete/:id', loginRequired, ContactController.delete);
routes.post('/contact/delete/:id', loginRequired, ContactController.authDelete);
routes.get('/contact/edit/:id', loginRequired, ContactController.edit);
routes.post('/contact/edit/:id', loginRequired, ContactController.authEdit);

module.exports = routes;
