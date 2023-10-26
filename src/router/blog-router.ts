import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import fetch from 'node-fetch';
import { typeDefs } from '../shema/blog-shema';
import resolvers from '../root/blog-root';
import { confighasura } from '../utils/config'
import { validationResult } from 'express-validator';
import * as auth from '../utils/authentication';


const router = Router();

router.use((req, res, next) => {
  if (auth.verifyToken(req, res)) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(422).json({ errors: errors.array() }); }
    next();
  } else { res.send(JSON.stringify({ error: 'we need token' })); }
  return null;
});

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
