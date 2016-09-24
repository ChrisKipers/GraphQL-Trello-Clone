const express = require('express');
const cors = require('cors');
const config = require('./config');
const graphqlHTTP = require('express-graphql');

const {connection} = require('./dao/connection');
const {schema} = require('./graphql_components/schema');


connection.sync();

const app = express();

app.enable('trust proxy');

app.use('/graphql', cors({maxAge: 60}), graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(config.PORT);
