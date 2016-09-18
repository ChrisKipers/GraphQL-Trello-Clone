const {GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLID, GraphQLInputObjectType} = require('graphql');
const {commentDao} = require('../../../dao/comment_dao');
const {commentTransformer} = require('../../../transformers/comment_transformer');

const addCommentMutation = {
  type: new GraphQLObjectType({
    name: 'addCommentPayload',
    fields: () => ({
      id: {
        type: GraphQLID
      },
      content: {
        type: GraphQLString
      }
    })
  }),
  args: {
    input: {
      type: new GraphQLInputObjectType({
        name: "addCommentInput",
        fields: () => ({
          content: {
            type: GraphQLString
          },
          createdByUserId: {
            type: GraphQLID
          }
        })
      })
    }
  },
  resolve: (_, {input}, context, into) => {
    return commentDao
      .create({content: input.content, creatorId: input.createdByUserId})
      .then(commentTransformer.transform);
  }
};

module.exports = {
  addCommentMutation
};