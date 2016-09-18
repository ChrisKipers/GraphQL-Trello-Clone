const express = require('express');
const graphqlHTTP = require('express-graphql');

const {connection} = require('./dao/connection');
const {schema} = require('./graphql_components/schema');

connection.sync();

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(4000);
