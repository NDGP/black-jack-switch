const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieSession = require('cookie-session')
const db = require('./db');
const dbHelpers = require('./db/helpers/dbHelpers')(db);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards')
const { nextTick } = require('process');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Headers','*')
  next()
})


app.use(cookieSession({
  secret: "milPool",
  saveUninitialized: true,
  resave: false,
  cookie: {
    httpOnly: true
  }
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/api/users', usersRouter(dbHelpers));
app.use('/api/cards', cardsRouter(dbHelpers));

module.exports = app;

