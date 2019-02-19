const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/acme-users-seq-crud');

const User = db.define('user', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
});

const syncAndSeed = () => {
  db.sync({ force: true }).then(() =>
    Promise.all([
      User.create({
        firstName: 'curly',
        lastName: 'wurly',
      }),
      User.create({
        firstName: 'joe',
        lastName: 'shmoe',
      }),
    ])
  );
};

module.exports = { db, User, syncAndSeed };
