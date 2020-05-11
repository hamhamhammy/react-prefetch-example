const graphql = require("graphql");

const { BumperDatabaseManager } = require('../database/manager');
const { hashPassword } = require('../database/utils');

// graphql post object
const PostType = new graphql.GraphQLObjectType({
  name: 'Post',
  fields: {
    rowId: { type: graphql.GraphQLID },
    username: { type: graphql.GraphQLString },
    license: { type: graphql.GraphQLString },
    state: { type: graphql.GraphQLString },
    message: { type: graphql.GraphQLString },
    created_date: { type: graphql.GraphQLString },
    emoji: { type: graphql.GraphQLString },
  },
});

// graphql signupuser object
const SignupUser = new graphql.GraphQLObjectType({
  name: 'SignupUser',
  fields: {
    rowId: { type: graphql.GraphQLID },
    email: { type: graphql.GraphQLString },
    username: { type: graphql.GraphQLString },
    password: { type: graphql.GraphQLString },
    license: { type: graphql.GraphQLString },
    state: { type: graphql.GraphQLString },
  },
});

// create a graphql query to select all and by id
var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      //first query to select all posts
      Posts: {
        type: graphql.GraphQLList(PostType),
        args:{
          limit: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLInt) // required
          },
          offset: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLInt) // required
          },
          license: {
            type: graphql.GraphQLString, // optional
          },
          state: {
            type: graphql.GraphQLString, // optional
          },
          username: {
            type: graphql.GraphQLString, // optional
          },
        },
        resolve: (root, args, context, info) => {
          return new Promise(async (resolve, reject) => {
            console.log('yoyoyo limit', args);
            // raw SQLite query to select from table
            try {
              const manager = new BumperDatabaseManager();
              const rows = await manager.fetchPosts(args); // req.query
              // console.log('rows = ', rows);
              manager.close();
              resolve(rows);
              // database.all("SELECT * FROM Posts;", function(err, rows) {  
              //     if(err){
              //         reject([]);
              //     }
              //     resolve(rows);
              // });
            } catch (err) {
              console.log('err = ', err);
              reject([]);
            }
          });
        }
      },
      //second query to select by id
      // Post:{
      //     type: PostType,
      //     args:{
      //         id:{
      //             type: new graphql.GraphQLNonNull(graphql.GraphQLID)
      //         }               
      //     },
      //     resolve: (root, {id}, context, info) => {
      //         return new Promise((resolve, reject) => {
      //             database.all("SELECT * FROM Posts WHERE id = (?);",[id], function(err, rows) {                           
      //                 if(err){
      //                     reject(null);
      //                 }
      //                 resolve(rows[0]);
      //             });
      //         });
      //     }
      // }
    }
});

// mutation type is a type of object to modify data (INSERT,DELETE,UPDATE)
var mutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
      //mutation for createPost
      createPost: {
        //type of object to return after create in SQLite
        type: PostType,
        //argument of mutation createPost to get from request
        args:{
          username: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString) // required
          },
          license: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString) // required
          },
          state: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString) // required
          },
          message: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString) // required
          },
          created_date: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString) // required
          },
          emoji: {
            type: graphql.GraphQLString // optional
          },
        },
        resolve: (root, args, context, info) => {
          return new Promise(async (resolve, reject) => {
            console.log('createPost args', args);
            try {
              const manager = new BumperDatabaseManager();
              await manager.createPost(args);
              manager.close();
              console.log('createPost success');
              resolve();
            } catch (err) {
              console.log('createPost err = ', err);
              reject();
            }
          });
        }
      },
      // //mutation for signup
      signupUser: {
        type: SignupUser,
        args:{
          email: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString) // required
          },
          username: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString) // required
          },
          password: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString) // required
          },
          license: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString) // required
          },
          state: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString) // required
          },
        },
        resolve: (root, args, context, info) => {
          return new Promise(async (resolve, reject) => {
            console.log('signupUser args', args);
            const { password } = args;
            const hashedPassword = hashPassword(password);
            console.log('hashedPassword = ', hashedPassword);

            try {
              const manager = new BumperDatabaseManager();
              await manager.registerUser({ ...args, password: hashedPassword });
              manager.close();
              resolve();
              // res.sendStatus(200);
            } catch (err) {
              // errorLog(err);
              // res.status(409).json({ error: 'User already exists' });
              reject({ error: 'User already exists' });
            }
          });
        }
      },
    }
});

//define schema with post object, queries, and mustation 
const schema = new graphql.GraphQLSchema({
    query: queryType,
    mutation: mutationType 
});

//export schema to use on index.js
module.exports = {
  schema,
};
