const {GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLID, GraphQLInputObjectType} = require('graphql');
const {boardDao} = require('../../../dao/board_dao');
const {boardTransformer} = require('../../../transformers/board_transformer');

const modifyBoardMutation = {
  type: new GraphQLObjectType({
    name: 'modifyBoardPayload',
    fields: () => ({
      id: {
        type: GraphQLID
      },
      name: {
        type: GraphQLString
      }
    })
  }),
  args: {
    input: {
      type: new GraphQLInputObjectType({
        name: "modifyBoardInput",
        fields: () => ({
          id: {
            type: GraphQLID
          },
          name: {
            type: GraphQLString
          }
        })
      })
    }
  },
  resolve: (_, {input}, context, into) => {
    return boardDao
      .update({name: input.name}, {where: {id: input.id}})
      .then(response => response[0])
      .then(numOfUpdateBoards => {
        if (numOfUpdateBoards > 0) {
          return boardDao.findById(input.id).then(boardTransformer.transform);
        } else {
          return null;
        }
      })
  }
};

module.exports = {
  modifyBoardMutation
};