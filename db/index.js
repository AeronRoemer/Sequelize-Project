const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db',
  logging: false
});

const db = {
    //sequelize instance containing diablect etc
  sequelize,
    //sequelize module from 'require'
  Sequelize,
    //movie DB modeal
  models: {},
};

db.models.Movie = require('./models/movie.js')(sequelize);
db.models.Person = require('./models/person.js')(sequelize);

module.exports = db;
