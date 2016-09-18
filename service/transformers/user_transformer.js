const userTransformer = {
  transform: (dbUser) => {
    return {
      id: dbUser.id,
      name: dbUser.name
    }
  }
};

module.exports = {
  userTransformer
};