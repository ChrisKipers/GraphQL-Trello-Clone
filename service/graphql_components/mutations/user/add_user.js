const {GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLID, GraphQLInputObjectType} = require('graphql');
const {userDao} = require('../../../dao/user_dao');
const {userTransformer} = require('../../../transformers/user_transformer');

const addUserMutation = {
  type: new GraphQLObjectType({
    name: 'addUserPayload',
    fields: () => ({
      id: {
        type: GraphQLID
      },
      name: {
        type: GraphQLString
      }
    })
  }),
  args: {
    input: {
      type: new GraphQLInputObjectType({
        name: "addUserInput",
        fields: () => ({
          name: {
            type: GraphQLString
          }
        })
      })
    }
  },
  resolve: (_, {input}, context, into) => {
    return userDao.create({name: input.name}).then(userTransformer.transform);
  }
};

module.exports = {
  addUserMutation
};