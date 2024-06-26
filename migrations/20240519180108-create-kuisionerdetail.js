'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Kuisionerdetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kuisioners_id: {
        type: Sequelize.INTEGER
      },
      opsi_jawaban: {
        type: Sequelize.STRING
      },
      jenis_soal: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('Kuisionerdetails', {
      fields: ['kuisioners_id'],
      type: 'foreign key',
      name: 'Kuisioners_fkey_kuisioners_detail_id',
      references: {
        table: 'Kuisioners',
        field: 'id'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Kuisionerdetails');
  }
};