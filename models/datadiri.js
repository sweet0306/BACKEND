'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Datadiri extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Datadiri.belongsTo(models.User, {
        foreignKey: 'users_id',
      });
      Datadiri.belongsTo(models.Akademik, {
        foreignKey: 'users_id',
      });
    }
  }
  Datadiri.init({
    users_id: DataTypes.INTEGER,
    no_alumni: DataTypes.STRING,
    nim: DataTypes.STRING,
    nama: DataTypes.STRING,
    jenis_kelamin: DataTypes.STRING,
    alamat: DataTypes.STRING,
    kode_pos: DataTypes.STRING,
    tempat_lahir: DataTypes.STRING,
    tanggal_lahir: DataTypes.DATE,
    no_hp:DataTypes.STRING,
    status: DataTypes.STRING,
    tentang: DataTypes.STRING,
    foto: DataTypes.STRING,
    url: DataTypes.STRING,
    is_verified: DataTypes.STRING,
    is_kuisioner: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Datadiri',
  });
  return Datadiri;
};