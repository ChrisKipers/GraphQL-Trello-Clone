const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID} = require('graphql');

const taskGraphQLType = new GraphQLObjectType({
  name: 'Task',
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
  taskGraphQLType
};