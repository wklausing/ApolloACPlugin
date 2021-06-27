'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DailyActivities', {
      Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ActivityDate: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      TotalSteps: {
        type: Sequelize.INTEGER
      },
      TotalDistance: {
        type: Sequelize.INTEGER
      },
      TrackerDistance: {
        type: Sequelize.INTEGER
      },
      LoggedActivitiesDistance: {
        type: Sequelize.INTEGER
      },
      VeryActiveDistance: {
        type: Sequelize.INTEGER
      },
      ModeratelyActiveDistance: {
        type: Sequelize.INTEGER
      },
      LightActiveDistance: {
        type: Sequelize.INTEGER
      },
      SedentaryActiveDistance: {
        type: Sequelize.INTEGER
      },
      VeryActiveMinutes: {
        type: Sequelize.INTEGER
      },
      FairlyActiveMinutes: {
        type: Sequelize.INTEGER
      },
      LightlyActiveMinutes: {
        type: Sequelize.INTEGER
      },
      SedentaryMinutes: {
        type: Sequelize.INTEGER
      },
      Calories: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DailyActivities');
  }
};
