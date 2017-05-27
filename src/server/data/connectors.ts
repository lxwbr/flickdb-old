const CREATE = false;

const Sequelize = require('sequelize');

const sequelize = new Sequelize('movies', null, null, {
  dialect: 'sqlite',
  storage: './db.sqlite'
});

sequelize.define('movie', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  original_title: { type: Sequelize.STRING }
});

sequelize.sync({force: CREATE});

const Movie = sequelize.models.movie;

export { Movie };