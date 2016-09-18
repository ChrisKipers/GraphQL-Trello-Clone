const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID} = require('graphql');

const {commentDao} = require('../../dao/comment_dao');
const {commentTransformer} = require('../../transformers/comment_transformer');


const userGraphQLType = new GraphQLObjectType({
  name: 'User',
  fields: () => {
    const {commentGraphQLType} = require('./comment'); // Require here to prevent cyclic dependency.
    return {
      id: {
        type: GraphQLID
      },
      name: {
        type: GraphQLString
      },
      comments: {
        type: new GraphQLList(commentGraphQLType),
        resolve: (parent) => {
          return commentDao.findAll({creatorId: parent.id}).then(commentTransformer.transform);
        }
      }
    }
  }
});

module.exports = {
  userGraphQLType
};