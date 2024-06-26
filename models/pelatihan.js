'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pelatihan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pelatihan.belongsTo(models.User, {
        foreignKey: 'users_id',
      });
    }
  }
  Pelatihan.init({
    users_id: DataTypes.INTEGER,
    nama_pelatihan: DataTypes.STRING,
    sertifikat: DataTypes.STRING,
    tahun: DataTypes.STRING,
    penyelenggara: DataTypes.STRING,
    keterangan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pelatihan',
  });
  return Pelatihan;
};