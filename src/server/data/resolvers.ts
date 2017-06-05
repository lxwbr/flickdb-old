import { Movie } from './connectors';

const resolvers = {
  Query: {
    movies: () => {
      return Movie.findAll();
    },
  },
};

export default resolvers;
