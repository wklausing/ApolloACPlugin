'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Persons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Persons.init({
    PersonID: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    LastName: DataTypes.STRING,
    FirstName: DataTypes.STRING,
    Address: DataTypes.STRING,
    City: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Persons',
    timestamps: false,
  });
  return Persons;
};
