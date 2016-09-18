const boardTransformer = {
  transform: (dbBoard) => {
    return {
      id: dbBoard.id,
      name: dbBoard.name
    }
  }
};

module.exports = {
  boardTransformer
};