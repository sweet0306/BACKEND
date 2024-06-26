'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Akademiks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      users_id: {
        type: Sequelize.INTEGER
      },
      angkatan: {
        type: Sequelize.STRING
      },
      tahun_lulus: {
        type: Sequelize.STRING
      },
      tanggal_yudisium: {
        type: Sequelize.DATEONLY
      },
      ipk: {
        type: Sequelize.STRING
      },
      lama_studi: {
        type: Sequelize.STRING
      },
      nilai_toefl: {
        type: Sequelize.STRING
      },
      studi_lanjut: {
        type: Sequelize.INTEGER
      },
      program_studi: {
        type: Sequelize.STRING,
      },
      fakultas: {
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
    //membuat foreign key pada table items
    await queryInterface.addConstraint('Akademiks', {
      fields: ['users_id'],
      type: 'foreign key',
      name: 'akademiks_fkey_users_id',
      references: {
        table: 'Users',
        field: 'id'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Akademiks');
  }
};