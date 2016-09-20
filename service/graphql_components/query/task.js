const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLEnumType} = require('graphql');

const taskStatusEnumGraphQLType = new GraphQLEnumType({
  name: 'TaskStatus',
  values: {
    NEW: { value: 0},
    ASSIGNED: { value: 1},
    IN_PROGRESS: { value: 2},
    COMPLETE: { value: 3},
    CLOSED: { value: 4}
  }
});

const taskGraphQLType = new GraphQLObjectType({
  name: 'Task',
  fields: () => {
    return {
      id: {
        type: GraphQLID
      },
      name: {
        type: GraphQLString
      },
      status: {
        type: taskStatusEnumGraphQLType
      }
    }
  }
});

module.exports = {
  taskGraphQLType, taskStatusEnumGraphQLType
};