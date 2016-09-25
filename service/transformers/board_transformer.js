const boardTransformer = {
  transform: (dbBoard) => {
    return {
      id: dbBoard.id,
      name: dbBoard.name,
      isArchived: dbBoard.isArchived
    }
  }
};

module.exports = {
  boardTransformer
};