const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID} = require('graphql');

const {userDao} = require('../../dao/user_dao');
const {userTransformer} = require('../../transformers/user_transformer');
const {boardDao} = require('../../dao/board_dao');
const {boardTransformer} = require('../../transformers/board_transformer');
const {boardGraphQLType} = require('./board');
const {userGraphQLType} = require('./user');

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: new GraphQLList(userGraphQLType),
      resolve() {
        return userDao.findAll().then(users => users.map(userTransformer.transform));
      }
    },
    user: {
      type: userGraphQLType,
      resolve() {
        return userDao.findAll().then(users => userTransformer.transform(users[0]));
      }
    },
    boards: {
      type: new GraphQLList(boardGraphQLType),
      resolve() {
        return boardDao.findAll().then(boards => boards.map(boardTransformer.transform));
      }
    }
  })
});

module.exports = {
  query
};