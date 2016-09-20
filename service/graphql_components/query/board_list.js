const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID} = require('graphql');

const boardListGraphQLType = new GraphQLObjectType({
  name: 'BoardList',
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
  boardListGraphQLType
};