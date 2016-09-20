const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLInt} = require('graphql');

const {boardListGraphQLType} = require('./board_list');
const {boardListDao} = require('../../dao/board_list_dao');
const {boardListTransformer} = require('../../transformers/board_list_transformer');


const boardListEdgeGraphQLType = new GraphQLObjectType({
  name: 'BoardListEdge',
  fields: () => {
    return {
      position: {
        type: GraphQLInt
      },
      node: {
        type: boardListGraphQLType
      }
    }
  }
});

const boardListCollectionGraphQLType = new GraphQLObjectType({
  name: 'BoardListCollection',
  fields: () => {
    return {
      edges: {
        type: new GraphQLList(boardListEdgeGraphQLType)
      }
    }
  }
});

const boardGraphQLType = new GraphQLObjectType({
  name: 'Board',
  fields: () => {
    return {
      id: {
        type: GraphQLID
      },
      name: {
        type: GraphQLString
      },
      lists: {
        type: boardListCollectionGraphQLType,
        resolve(parent) {
          return boardListDao.findAll({where: {boardId: parent.id}})
            .then(boardLists => {
              return boardLists.map(bl => ({
                position: bl.position,
                node: boardListTransformer.transform(bl)
              }))
            });
        }
      }
    }
  }
});

module.exports = {
  boardGraphQLType
};