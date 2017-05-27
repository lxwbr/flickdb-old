import { buildSchema, GraphQLSchema } from 'graphql';

const schema = buildSchema(`
  type Movie {
    id: Int
    original_title: String
  }

  type Query {
    hello: String
    movies: [Movie]
  }

  schema {
    query: Query
  }
  `);

export { schema, GraphQLSchema };
