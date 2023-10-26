import fetch from 'node-fetch';
import { confighasura } from '../utils/config'


const resolvers = {
  Mutation: {
    insert: async (_: any, { blogTopic, blogContent, blogDatePost, email }: { blogTopic: string, blogContent: string, blogDatePost: string, email: string }) => {
      const response = await fetch(confighasura().endPointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': confighasura().key
        },
        body: JSON.stringify({
          query: `
          mutation ($blogTopic: String!, $blogContent: String!, $blogDatePost: String!, $email: String!) {
            insert_Blog(objects: [
               {
                blogTopic: $blogTopic,
                 blogContent: $blogContent,
                 blogDatePost: $blogDatePost,
                 email: $email
               }
             ]) {
               affected_rows
             }
           }
          `,
          variables: {
            blogTopic,
            blogContent,
            blogDatePost,
            email
          }
        })
      });

      const { data } = await response.json();
  if (data.insert_Blog.affected_rows>0)
      return "operation successfully";
    else
    return "operation not successfully";
    },
    delete: async (_: any, { id }: { id: number}) => {
      const response = await fetch(confighasura().endPointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': confighasura().key
        },
        body: JSON.stringify({
          query: `
          mutation ($id: bigint!) {
            delete_Blog_by_pk(id: $id) {
              id
              blogTopic
              blogContent
              blogDatePost
              email
            }
          }
          `,
          variables: {
            id
          }
        })
      });

      const { data } = await response.json();
      if(data.delete_Blog_by_pk===null)
      return "operation not successfully, don't find any records for delete";
      else
      return "operation successfully";
      
    },
    update: async (_: any, { id, blogTopic, blogContent, blogDatePost, email }: { id: number, blogTopic: string, blogContent: string, blogDatePost:string, email: string }) => {
      const response = await fetch(confighasura().endPointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': confighasura().key
        },
        body: JSON.stringify({
          query: `
          mutation ($id: bigint!, $blogTopic: String!, $blogContent: String!, $blogDatePost: String!, $email: String!) {
            update_Blog_by_pk(pk_columns: {id: $id}, _set: {blogTopic: $blogTopic, blogContent: $blogContent, blogDatePost: $blogDatePost, email: $email}) {
              id
              blogTopic
              blogContent
              blogDatePost
              email
            }
          }
          `,
          variables: {
            id,
            blogTopic,
            blogContent,
            blogDatePost,
            email
          }
        })
      });
    
      const { data } = await response.json();
    
      if (data.update_Blog_by_pk === null) {
        return "operation not successfully,don't find any records for update";
        } else {
        return "operation successfully";
      }
    }
    
  },
  Query: {
    blogsByEmail: async (_: any, { email}: { email: string}) => {
      const response = await fetch(confighasura().endPointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': confighasura().key
        },
        body: JSON.stringify({
          query: `
          query ($email: String!) {
            Blog(where: { email: { _eq: $email } }) {
              id
              blogTopic
              blogContent
              blogDatePost
              email
            }
          }
          `,
          variables: {
            email

          }
        })
      });

      const { data } = await response.json();
     return  data.Blog;
    }
  }
};

export default resolvers;
