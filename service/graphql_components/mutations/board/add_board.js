const {GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLID, GraphQLInputObjectType, GraphQLBoolean} = require('graphql');
const {boardDao} = require('../../../dao/board_dao');
const {boardTransformer} = require('../../../transformers/board_transformer');

const addBoardMutation = {
  type: new GraphQLObjectType({
    name: 'addBoardPayload',
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
        name: "addBoardInput",
        fields: () => ({
          name: {
            type: GraphQLString
          }
        })
      })
    }
  },
  resolve: (_, {input}, context, into) => {
    return boardDao
      .create({name: input.name})
      .then(boardTransformer.transform);
  }
};

module.exports = {
  addBoardMutation
};