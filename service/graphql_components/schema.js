const {GraphQLSchema} = require('graphql');
const {query} = require('./query/query');
const {mutations} = require('./mutations/mutations');

const schema = new GraphQLSchema({
  query,
  mutation: mutations
});

module.exports = {
  schema
};