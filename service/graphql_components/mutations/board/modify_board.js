const {GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLID, GraphQLInputObjectType, GraphQLBoolean} = require('graphql');
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
      },
      isArchived: {
        type: GraphQLBoolean
      },
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
          },
          isArchived: {
            type: GraphQLBoolean
          },
        })
      })
    }
  },
  resolve: (_, {input}, context, into) => {
    const updateArgs = {name: input.name};
    if (input.isArchived !== undefined) {
      updateArgs.isArchived = input.isArchived;
    }
    return boardDao
      .update(updateArgs, {where: {id: input.id}})
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