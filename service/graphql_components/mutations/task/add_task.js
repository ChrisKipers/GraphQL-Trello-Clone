const {GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLInt, GraphQLID, GraphQLInputObjectType} = require('graphql');
const {taskDao} = require('../../../dao/task_dao');

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
        return taskDao.create({name: input.name, boardListId: input.boardListId, position})
      })
      .then(r => ({
        id: r.id,
        name: r.name,
        boardListId: r.boardListId,
        position: r.position
      }));
  }
};

module.exports = {
  addTaskMutation
};