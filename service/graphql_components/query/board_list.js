const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLID} = require('graphql');

const {taskGraphQLType} = require('./task');
const {taskDao} = require('../../dao/task_dao');
const {taskTransformer} = require('../../transformers/task_transformer');

const taskEdgeGraphQLType = new GraphQLObjectType({
  name: 'TaskEdge',
  fields: () => {
    return {
      position: {
        type: GraphQLInt
      },
      node: {
        type: taskGraphQLType
      }
    }
  }
});

const taskCollectionGraphQLType = new GraphQLObjectType({
  name: 'TaskCollection',
  fields: () => {
    return {
      edges: {
        type: new GraphQLList(taskEdgeGraphQLType)
      }
    }
  }
});

const boardListGraphQLType = new GraphQLObjectType({
  name: 'BoardList',
  fields: () => {
    return {
      id: {
        type: GraphQLID
      },
      name: {
        type: GraphQLString
      },
      tasks: {
        type: taskCollectionGraphQLType,
        resolve(parent) {
          return taskDao.findAll({where: {boardListId: parent.id}})
            .then(tasks => {
              const edges = tasks.map(ts => ({
                position: ts.position,
                node: taskTransformer.transform(ts)
              }));
              return {edges};
            });
        }
      },
      numberOfTasks: {
        type: GraphQLInt,
        resolve(parent) {
          return taskDao.count({where: {boardListId: parent.id}})
        }
      }
    }
  }
});

module.exports = {
  boardListGraphQLType
};