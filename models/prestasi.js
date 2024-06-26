'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prestasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Prestasi.belongsTo(models.User, {
        foreignKey: 'users_id',
      });
    }
  }
  Prestasi.init({
    users_id: DataTypes.INTEGER,
    nama_kejuaraan: DataTypes.STRING,
    penyelenggara: DataTypes.STRING,
    tahun: DataTypes.STRING,
    skala: DataTypes.STRING,
    keterangan: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Prestasi',
  });
  return Prestasi;
};