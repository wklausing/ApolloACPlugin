const resolvers = {
  Query: {
    async user (_, { id, activityDate }, { models }) {
      return models.DailyActivity.findByPk(id, activityDate)
    },
    async person1 (_, __, { models }) {
      return models.Persons.findAll()
    }
  },
};

module.exports = resolvers;
