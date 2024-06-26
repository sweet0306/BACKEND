'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tracerinstansi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tracerinstansi.belongsTo(models.User, {
        foreignKey: 'users_id',
      });
    }
  }
  Tracerinstansi.init({
    users_id: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    lingkup: DataTypes.STRING,
    tahun: DataTypes.STRING,
    email: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    url_tracer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tracerinstansi',
  });
  return Tracerinstansi;
};