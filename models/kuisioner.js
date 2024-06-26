'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kuisioner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kuisioner.hasMany(models.Datadiri, {
        foreignKey: 'users_id',
      });
      // Kuisioner.belongsTo(models.Kuisionerdetails, {
      //   foreignKey: 'kuisioners_id',
      // });
    }
  }
  Kuisioner.init({
    // kode_pertanyaan: DataTypes.STRING,
    kode_pertanyaan: DataTypes.STRING,
    pertanyaan: DataTypes.STRING,
    // pilihan: DataTypes.TEXT,
    jenis_pertanyaan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Kuisioner',
  });
  return Kuisioner;
};