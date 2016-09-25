const {GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLInt, GraphQLID, GraphQLInputObjectType} = require('graphql');
const {taskDao} = require('../../../dao/task_dao');
const {taskStatusEnumGraphQLType} = require('../../query/task');
const {taskStatusTransformer} = require('../../../transformers/task_transformer');

const addTaskMutation = {
  type: new GraphQLObjectType({
    name: 'addTaskPayload',
    fields: () => ({
      id: {
        type: GraphQLID
      },
      boardListId: {
        type: GraphQLID
      },
      name: {
        type: GraphQLString
      },
      position: {
        type: GraphQLInt
      },
      status: {
        type: taskStatusEnumGraphQLType
      }
    })
  }),
  args: {
    input: {
      type: new GraphQLInputObjectType({
        name: "addTaskInput",
        fields: () => ({
          name: {
            type: GraphQLString
          },
          status: {
            type: taskStatusEnumGraphQLType
          },
          boardListId: {
            type: GraphQLID
          }
        })
      })
    }
  },
  resolve: (_, {input}, context, into) => {
    return taskDao.max('position', {where: {boardListId: input.boardListId}})
      .then(result => {
        const position = result != result ? 0: result + 1;
        const addProperties = {name: input.name, boardListId: input.boardListId, position};
        if (input.status) {
          addProperties.status = taskStatusTransformer.transformGraphToDb(input.status);
        }
        return taskDao.create(addProperties);
      })
      .then(r => ({
        id: r.id,
        name: r.name,
        boardListId: r.boardListId,
        position: r.position,
        status: taskStatusTransformer.transformDbToGraph(r.status)
      }));
  }
};

module.exports = {
  addTaskMutation
};