//@ts-checks
import * as express from "express";
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { mockServer, addResolveFunctionsToSchema } from 'graphql-tools';

import { schema } from './data/schema';
import resolvers from './data/resolvers';
import mocks from './data/mocks';

const GRAPHQL_PORT = 8080;

export default (mock: Boolean) => {
  const graphQLServer = express();

  if (mock)
    mockServer(schema, mocks);
  else
    addResolveFunctionsToSchema(schema, resolvers);

  graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({
    schema: schema
  }));

  graphQLServer.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  graphQLServer.listen(GRAPHQL_PORT, () => console.log(
    `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql \nGraphiQL Client is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  ));
}