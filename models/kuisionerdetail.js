'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kuisionerdetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kuisionerdetail.belongsTo(models.Kuisioner, {
        foreignKey: 'kuisioners_id',
      });
      // Kuisionerdetail.hasMany(models.Kuisioners, {
      //   foreignKey: 'kuisioners_id',
      // });
    }
  }
  Kuisionerdetail.init({
    kuisioners_id: DataTypes.INTEGER,
    opsi_jawaban: DataTypes.STRING,
    jenis_soal: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Kuisionerdetail',
  });
  return Kuisionerdetail;
};