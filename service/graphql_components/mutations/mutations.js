const {GraphQLObjectType} = require('graphql');
const {addUserMutation} = require('./user/add_user');
const {addCommentMutation} = require('./comment/add_comment');

const mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addUser: addUserMutation,
    addComment: addCommentMutation
  })
});

module.exports = {
  mutations
};