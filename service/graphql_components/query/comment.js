const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID} = require('graphql');
const {userDao} = require('../../dao/user_dao');
const {userTransformer} = require('../../transformers/user_transformer');

const commentGraphQLType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => {
    const {userGraphQLType} = require('./user'); // Require here to prevent cyclic dependency.
    return {
      id: {
        type: GraphQLID
      },
      content: {
        type: GraphQLString
      },
      createdBy: {
        type: userGraphQLType,
        resolve: (parent) => {
          return userDao.findOne({id: parent.creatorId}).then(userTransformer.transform)
        }
      }
    }
  }
});

module.exports = {
  commentGraphQLType
};