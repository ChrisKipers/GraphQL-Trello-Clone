const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLNonNull} = require('graphql');

const {boardDao} = require('../../dao/board_dao');
const {boardTransformer} = require('../../transformers/board_transformer');
const {boardGraphQLType} = require('./board');

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    boards: {
      type: new GraphQLList(boardGraphQLType),
      resolve() {
        return boardDao.findAll().then(boards => boards.map(boardTransformer.transform));
      }
    },
    board: {
      type: boardGraphQLType,
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, {id}) {
        return boardDao.findOne({id}).then(boardTransformer.transform);
      }
    }
  })
});

module.exports = {
  query
};