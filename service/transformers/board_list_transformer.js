const boardListTransformer = {
  transform: (dbListBoard) => {
    return {
      id: dbListBoard.id,
      name: dbListBoard.name
    }
  }
};

module.exports = {
  boardListTransformer
};