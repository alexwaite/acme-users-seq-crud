const express = require('express');
const db = require('./db');
const app = express();
const ejs = require('ejs');
const methodOverride = require('method-override');

// const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded());

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(methodOverride('_method'));

// - GET /
app.get('/', (req, res, next) => {
  res.redirect('/users/');
});

// - GET /users
app.get('/users/', (req, res, next) => {
  db.User.findAll()
    .then(users => res.render('index', { users }))
    .catch(next);
});

// app.get('/users/:id', (req, res, next) => {
//   db.User.findOne({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then(user => res.render('update', { user }))
//     .catch(next);
// });

// - POST /users
app.post('/users/', (req, res, next) => {
  db.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  })
    .then(() => res.redirect('/users/'))
    .catch(next);
});

// - PUT /users/:id

app.put('/users/:id', (req, res, next) => {
  db.User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(user =>
      user.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      })
    )
    .then(() => res.redirect('/users').catch(next));
});

// - DELETE /users/:id

app.delete('/users/:id', (req, res, next) => {
  db.User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.redirect('/users/'))
    .catch(next);
});

module.exports = app;
