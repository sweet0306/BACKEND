'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Prestasis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      users_id: {
        type: Sequelize.INTEGER
      },
      nama_kejuaraan: {
        type: Sequelize.STRING
      },
      penyelenggara: {
        type: Sequelize.STRING
      },
      tahun: {
        type: Sequelize.STRING
      },
      skala: {
        type: Sequelize.STRING
      },
      keterangan: {
        type: Sequelize.TEXT
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
    //membuat foreign key pada table user
    await queryInterface.addConstraint('Prestasis', {
      fields: ['users_id'],
      type: 'foreign key',
      name: 'prestasis_fkey_users_id',
      references: {
        table: 'Users',
        field: 'id'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Prestasis');
  }
};