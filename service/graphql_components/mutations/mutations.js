const {GraphQLObjectType} = require('graphql');
const {addUserMutation} = require('./user/add_user');
const {addCommentMutation} = require('./comment/add_comment');
const {addBoardMutation} = require('./board/add_board');
const {addBoardListMutation} = require('./board_list/add_board_list');

const mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addUser: addUserMutation,
    addComment: addCommentMutation,
    addBoardMutation: addBoardMutation,
    addBoardListMutation: addBoardListMutation
  })
});

module.exports = {
  mutations
};