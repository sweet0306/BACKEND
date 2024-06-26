'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lokers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      users_id: {
        type: Sequelize.INTEGER
      },
      judul: {
        type: Sequelize.STRING
      },
      posisi: {
        type: Sequelize.STRING
      },
      flyerimg: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      tanggal: {
        type: Sequelize.DATEONLY
      },
      isPublish: {
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
    //membuat foreign key pada table user
    await queryInterface.addConstraint('Lokers', {
      fields: ['users_id'],
      type: 'foreign key',
      name: 'lokers_fkey_users_id',
      references: {
        table: 'Users',
        field: 'id'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Lokers');
  }
};