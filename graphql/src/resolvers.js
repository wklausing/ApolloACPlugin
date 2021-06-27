const resolvers = {
  Query: {
    async user (root, { id }, { models }) {
      return models.DailyActivity.findByPk(id)
    }
  },
};

module.exports = resolvers;
