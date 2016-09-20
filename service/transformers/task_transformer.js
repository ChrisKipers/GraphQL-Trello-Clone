const taskTransformer = {
  transform: (dbTask) => {
    return {
      id: dbTask.id,
      name: dbTask.name
    }
  }
};

module.exports = {
  taskTransformer
};