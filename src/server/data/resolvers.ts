import { Movie } from './connectors';

const resolvers = {
  Query: {
    movies: () => {
      return Movie.all();
    },
  },
};

export default resolvers;
