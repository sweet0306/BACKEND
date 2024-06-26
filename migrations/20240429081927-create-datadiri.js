'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Datadiris', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      users_id: {
        type: Sequelize.INTEGER
      },
      no_alumni: {
        type: Sequelize.STRING
      },
      nim: {
        type: Sequelize.STRING
      },
      nama: {
        type: Sequelize.STRING
      },
      jenis_kelamin: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      kode_pos: {
        type: Sequelize.STRING
      },
      tempat_lahir: {
        type: Sequelize.STRING
      },
      tanggal_lahir: {
        type: Sequelize.DATEONLY
      },
      no_hp: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      tentang: {
        type: Sequelize.STRING
      },
      foto: {
        type: Sequelize.STRING
      },
      is_verified: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "no"
      },
      is_kuisioner: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      url: {
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
    await queryInterface.addConstraint('Datadiris', {
      fields: ['users_id'],
      type: 'foreign key',
      name: 'custom_fkey_users_id',
      references: {
        table: 'Users',
        field: 'id'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Datadiris');
  }
};