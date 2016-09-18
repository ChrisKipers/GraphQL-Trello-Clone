const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID} = require('graphql');

const boardGraphQLType = new GraphQLObjectType({
  name: 'Board',
  fields: () => {
    return {
      id: {
        type: GraphQLID
      },
      name: {
        type: GraphQLString
      }
    }
  }
});

module.exports = {
  boardGraphQLType
};