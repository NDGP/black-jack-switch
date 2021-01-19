const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

<<<<<<< HEAD
const db = require('./db/index');
const dbHelpers = require('./db/helpers/dbHelpers')(db);

=======
const db = require('./db');
const dbHelpers = require('./db/helpers/dbHelpers')(db);
>>>>>>> main

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


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

<<<<<<< HEAD
// app.use('/users', usersRouter);
app.use('/users', usersRouter(dbHelpers));
=======
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/api/users', usersRouter(dbHelpers));
app.use('/api/cards', cardsRouter(dbHelpers));
>>>>>>> main

module.exports = app;

