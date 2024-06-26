'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Loker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Loker.belongsTo(models.User, {
        foreignKey: 'users_id',
      });
    }
  }
  Loker.init({
    users_id: DataTypes.INTEGER,
    judul: DataTypes.STRING,
    posisi: DataTypes.STRING,
    tanggal: DataTypes.DATE,
    flyerimg: DataTypes.STRING,
    url: DataTypes.STRING,
    isPublish: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Loker',
  });
  return Loker;
};