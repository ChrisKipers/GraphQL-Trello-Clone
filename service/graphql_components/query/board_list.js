const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLID} = require('graphql');

const {taskGraphQLType, taskStatusEnumGraphQLType} = require('./task');
const {taskDao} = require('../../dao/task_dao');
const {taskTransformer, taskStatusTransformer} = require('../../transformers/task_transformer');

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
        args: {
          statuses: {
            name: 'statuses',
            type: new GraphQLList(taskStatusEnumGraphQLType)
          }
        },
        type: taskCollectionGraphQLType,
        resolve(parent, {statuses}) {
          const queryClause = {where: {boardListId: parent.id}};
          if (statuses) {
            const dbStatus = statuses.map(taskStatusTransformer.transformGraphToDb)
            queryClause.where.status = {
              in: dbStatus
            }
          }

          return taskDao.findAll(queryClause)
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
        args: {
          statuses: {
            name: 'statuses',
            type: new GraphQLList(taskStatusEnumGraphQLType)
          }
        },
        resolve(parent, {statuses}) {
          //TODO: move logic to real dao. This is too tightly coupled, and not DRY.
          const queryClause = {where: {boardListId: parent.id}};
          if (statuses) {
            const dbStatus = statuses.map(taskStatusTransformer.transformGraphToDb)
            queryClause.where.status = {
              in: dbStatus
            }
          }
          return taskDao.count(queryClause)
        }
      }
    }
  }
});

module.exports = {
  boardListGraphQLType
};