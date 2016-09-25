const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLBoolean} = require('graphql');

const {boardDao} = require('../../dao/board_dao');
const {boardTransformer} = require('../../transformers/board_transformer');
const {boardGraphQLType} = require('./board');

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    boards: {
      args: {
        isArchived: {
          name: 'isArchived',
          type: GraphQLBoolean
        }
      },
      type: new GraphQLList(boardGraphQLType),
      resolve(_, {isArchived}) {
        const queryParts = {};
        if (isArchived !== undefined) {
          queryParts.isArchived = isArchived;
        }
        const isQueryPartsEmpty = Object.keys(queryParts).length == 0;
        const query = isQueryPartsEmpty ? {} : {where: queryParts};
        return boardDao.findAll(query).then(boards => boards.map(boardTransformer.transform));
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
        return boardDao.findById(id).then(boardTransformer.transform);
      }
    }
  })
});

module.exports = {
  query
};