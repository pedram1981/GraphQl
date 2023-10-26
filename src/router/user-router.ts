import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import fetch from 'node-fetch';
import typeDefs from '../shema/user-shema';
import resolvers from '../root/user-root';
import { confighasura } from '../utils/config'


const router = Router();

const schema = makeExecutableSchema({ typeDefs, resolvers });

router.use('/', graphqlHTTP({
  schema,
  graphiql: true,
  context: async () => {
    const response = await fetch(confighasura().endPointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': confighasura().key
      },
      body: JSON.stringify({
        query: `
          query {
            _service {
              sdl
            }
          }
        `
      })
    });

    const { data } = await response.json();

    return {
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': confighasura().key
      },
      schema: data._service.sdl
    };
  }
}));

export { router };
