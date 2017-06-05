import * as Sequelize from 'sequelize';

const CREATE = false;

const sequelize = new Sequelize('movies', '', '', {
  dialect: 'sqlite',
  storage: './db.sqlite'
});

const MovieModel = sequelize.define('movie', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  original_title: { type: Sequelize.STRING }
});

sequelize.sync({force: CREATE});

if (CREATE) {
  sequelize.sync({force: true}).then(() => {
    MovieModel.create({
      id: 1,
      original_title: 'Ant-man'
    });
    MovieModel.create({
      id: 2,
      original_title: 'Spiderman'
    });
    MovieModel.create({
      id: 3,
      original_title: 'Batman'
    });
  });
};

const Movie = sequelize.models.movie;

export { Movie };