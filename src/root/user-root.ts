import fetch from 'node-fetch';
import { confighasura } from '../utils/config'
import { createToken } from "../utils/authentication";

const resolvers = {
  Mutation: {
    signOut: async (_: any, { email, pass }: { email: string, pass: string }) => {
      const response = await fetch(confighasura().endPointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': confighasura().key
        },
        body: JSON.stringify({
          query: `
            mutation ($email: String!, $pass: String!) {
              insert_Users(objects: [
                {
                  email: $email,
                  pass: $pass
                }
              ], on_conflict: {constraint: Users_email_key, update_columns: []}) {
                affected_rows
              }
            }
          `,
          variables: {
            email,
            pass
          }
        })
      });

      const { data } = await response.json();
  if (data.insert_Users.affected_rows>0)
      return "operation successfully";
    else
    return "operation not successfully, change the email address";
    }
  },
  Query: {
    signIn: async (_: any, { email,pass}: { email: string, pass:string }) => {
      const response = await fetch(confighasura().endPointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': confighasura().key
        },
        body: JSON.stringify({
          query: `
          query ($email: String!, $pass: String!) {
            Users(where: {email: {_eq: $email}, pass: {_eq: $pass}}) {
              email
            }
          }
          `,
          variables: {
            email,
            pass

          }
        })
      });

      const { data } = await response.json();
      let token:string='-';
      if (data.Users.length !== 0){
      token=createToken(data.Users[0].email);
      }
      return  { 
        email,
        token
      };
    }
  }
};

export default resolvers;
