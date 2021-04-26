// @ts-check

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server-express');
import { database } from './db/database';

import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/schema';
import models from './models';

const apolloSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();

const server = new ApolloServer({
  schema: apolloSchema,
  introspection: true,
  playground: true,
  context: async () => ({
    models
  }),
});

server.applyMiddleware({ app });

app.use(bodyParser.json);
app.use(cors());

const PORT = process.env.port || 4001;

// app.get('/', (req,res) => res.send('Express + TypeScript Server'));
// app.get('/health', (req, res) => {
//   res.send('It\'s all good here. :)');
// });

/* Sequelize instance to connect to the DB (using postgres credentials) ANDDDD! create tables which don't exist yet
** Use it to : connect to the db AND create tables, thus altering the database (and possibly DELETE what's inside)
** Useful for now, but please prefer `database.authenticate()` once deploying to production :)
*/
database
.sync().then(() => {
  app.listen({ port: PORT }, err => {
    if (err) {
      return console.error(err);
    }
    console.log("New changes coming?");
    console.log(`🚀 Apollo Server ready at http://localhost:${PORT}/graphql`);
  });
  console.log("Database connection established FROM SERVER");
  // console.log("Hello DB :", database);
})
.catch((error) => {
  console.error("ERR : ", error);
});

/* Sequelize instance to simply connect to the DB (using postgres credentials)
** Use it to : connect to the db but not create tables, thus keeping the database intact (no deletions)
*/

// database
// .authenticate().then(() => {
//   app.listen({ port: PORT }, err => {
//     if (err) {
//       return console.error(err);
//     }
//     console.log(`🚀 Apollo Server ready at http://localhost:${PORT}/graphql`);
//   });
//   console.dir('Database connection established.') 
// })
// .catch((error) => {
//   console.error('An error happened during DB connection : ', error);
// });

