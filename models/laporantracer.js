'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LaporanTracer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LaporanTracer.belongsTo(models.User, {
        foreignKey: 'users_id',
      });
    }
  }
  LaporanTracer.init({
    users_id: DataTypes.INTEGER,
    file_tracer: DataTypes.STRING,
    url: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LaporanTracer',
  });
  return LaporanTracer;
};