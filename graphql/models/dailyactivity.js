'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DailyActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DailyActivity.init({
    Id: DataTypes.INTEGER,
    ActivityDate: DataTypes.STRING,
    TotalSteps: DataTypes.INTEGER,
    TotalDistance: DataTypes.INTEGER,
    TrackerDistance: DataTypes.INTEGER,
    LoggedActivitiesDistance: DataTypes.INTEGER,
    VeryActiveDistance: DataTypes.INTEGER,
    ModeratelyActiveDistance: DataTypes.INTEGER,
    LightActiveDistance: DataTypes.INTEGER,
    SedentaryActiveDistance: DataTypes.INTEGER,
    VeryActiveMinutes: DataTypes.INTEGER,
    FairlyActiveMinutes: DataTypes.INTEGER,
    LightlyActiveMinutes: DataTypes.INTEGER,
    SedentaryMinutes: DataTypes.INTEGER,
    Calories: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DailyActivity',
  });
  return DailyActivity;
};