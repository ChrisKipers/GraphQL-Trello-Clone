const commentTransformer = {
  transform: (dbComment) => {
    return {
      id: dbComment.id,
      content: dbComment.content
    }
  }
};

module.exports = {
  commentTransformer
};
