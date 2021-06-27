const resolvers = {
  Query: {
    async user (root, { id, activityDate }, { models }) {
      return models.DailyActivity.findByPk(id, activityDate)
    },
    async person1 (root, args, { models }) {
      return models.Persons.findAll()
    }
  },
};

module.exports = resolvers;
