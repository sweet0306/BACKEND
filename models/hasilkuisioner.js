'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hasilkuisioner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Hasilkuisioner.belongsTo(models.User, {
        foreignKey: 'users_id',
      });
      // define association here
      // Hasilkuisioner.belongsTo(models.Kuisioner, {
      //   foreignKey: 'kuisioners_id',
      // });
    }
  }
  Hasilkuisioner.init({
    kuisioners_id: DataTypes.STRING,
    users_id: DataTypes.INTEGER,
    soal: DataTypes.STRING,
    jawaban: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hasilkuisioner',
  });
  return Hasilkuisioner;
};