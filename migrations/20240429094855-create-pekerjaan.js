'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pekerjaans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      users_id: {
        type: Sequelize.INTEGER
      },
      is_working: {
        type: Sequelize.STRING
      },
      is_looking_for_job: {
        type: Sequelize.STRING
      },
      instansi: {
        type: Sequelize.STRING
      },
      url_instansi: {
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
    await queryInterface.addConstraint('Pekerjaans', {
      fields: ['users_id'],
      type: 'foreign key',
      name: 'pekerjaans_fkey_users_id',
      references: {
        table: 'Users',
        field: 'id'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pekerjaans');
  }
};