// require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csurf = require('csurf');
const Mongo = require('./db/MongoUtils');
const flash = require('connect-flash');
const globalMiddleware = require('./middlewares/globalMiddleware');
const csrfProtection = require('./middlewares/csrfProtection');
const errorHandler = require('./middlewares/errorHandler');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const sessionOptions = {
  secret: process.env.SECRET,
  store: MongoStore.create({
    mongoUrl: process.env.MONGOSTOREURI
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
};

// Setting up the view engine and views folder

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

// Setting up the necessary middlewares

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionOptions));
app.use(flash());
app.use(globalMiddleware);
app.use(helmet());
app.use(csurf());
app.use(csrfProtection);
app.use(routes);
app.use(errorHandler);

const run = async () => {
  try {
    await Mongo.init();
    const port = process.env.PORT;

    app.listen(port, () =>
      console.log(`App running at http://localhost:${port}/`)
    );
  } catch (err) {
    return console.log(err);
  }
};

run();
