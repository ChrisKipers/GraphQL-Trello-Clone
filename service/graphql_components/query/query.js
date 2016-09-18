const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID} = require('graphql');

const {userDao} = require('../../dao/user_dao');
const {userTransformer} = require('../../transformers/user_transformer');
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
    }
  })
});

module.exports = {
  query
};