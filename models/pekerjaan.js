'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pekerjaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pekerjaan.belongsTo(models.User, {
        foreignKey: 'users_id',
      });
    }
  }
  Pekerjaan.init({
    users_id: DataTypes.INTEGER,
    is_working: DataTypes.STRING,
    is_looking_for_job: DataTypes.STRING,
    instansi: DataTypes.STRING,
    url_instansi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pekerjaan',
  });
  return Pekerjaan;
};