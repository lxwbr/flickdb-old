import { buildSchema, GraphQLSchema } from 'graphql';

const schema = buildSchema(`
  interface Node {
    id: ID!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type Movie : Node {
    id: ID!
    original_title: String
  }

  type MovieEdge {
    cursor: String!
    node: Movie
  }

  type MovieConnection {
    edges: [MovieEdge]
    pageInfo: PageInfo!
  }

  type Viewer {
    id: ID!
    movies: MovieConnection
  }

  type Query {
    viewer: Viewer
  }

  schema {
    query: Query
  }
  `);

export { schema, GraphQLSchema };
