'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Akademik extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Akademik.belongsTo(models.User, {
        foreignKey: 'users_id',
      });
    }
  }
  Akademik.init({
    users_id: DataTypes.INTEGER,
    angkatan: DataTypes.STRING,
    tahun_lulus: DataTypes.STRING,
    tanggal_yudisium: DataTypes.DATE,
    ipk: DataTypes.STRING,
    lama_studi: DataTypes.STRING,
    nilai_toefl: DataTypes.STRING,
    studi_lanjut: DataTypes.INTEGER,
    program_studi: DataTypes.STRING,
    fakultas: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Akademik',
  });
  return Akademik;
};