const {GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLInt, GraphQLID, GraphQLInputObjectType} = require('graphql');
const {boardListDao} = require('../../../dao/board_list_dao');
const {boardListTransformer} = require('../../../transformers/board_list_transformer');

const addBoardListMutation = {
  type: new GraphQLObjectType({
    name: 'addBoardListPayload',
    fields: () => ({
      id: {
        type: GraphQLID
      },
      boardId: {
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
        name: "addBoardListInput",
        fields: () => ({
          name: {
            type: GraphQLString
          },
          boardId: {
            type: GraphQLID
          },
        })
      })
    }
  },
  resolve: (_, {input}, context, into) => {
    return boardListDao.max('position', {where: {boardId: input.boardId}})
      .then(result => {
        console.log(result)
        const position = result != null ? result + 1 : 0;
        return boardListDao.create({name: input.name, boardId: input.boardId, position})
      })
      .then(r => ({
        id: r.id,
        name: r.name,
        boardId: r.boardId,
        position: r.position
      }));
  }
};

module.exports = {
  addBoardListMutation
};