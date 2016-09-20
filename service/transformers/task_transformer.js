const taskTransformer = {
  transform: (dbTask) => {
    return {
      id: dbTask.id,
      name: dbTask.name,
      status: taskStatusTransformer.transformDbToGraph(dbTask.status)
    }
  }
};

const taskStatusTransformer = {
  transformGraphToDb: (graphStatus) => {
    switch (graphStatus) {
      case 0: return 'NEW';
      case 1: return 'ASSIGNED';
      case 2: return 'IN PROGRESS';
      case 3: return 'COMPLETE';
      case 4: return 'CLOSED';
    }
  },

  transformDbToGraph: (dbStatus) => {
    switch (dbStatus) {
      case 'NEW': return 0;
      case 'ASSIGNED': return 1;
      case 'IN PROGRESS': return 2;
      case 'COMPLETE': return 3;
      case 'CLOSED': return 4;
    }
  }
}

module.exports = {
  taskTransformer, taskStatusTransformer
};