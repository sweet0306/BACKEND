'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Hasilkuisioners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      users_id: {
        type: Sequelize.INTEGER
      },
      kuisioners_id: {
        type: Sequelize.STRING
      },
      soal: {
        type: Sequelize.STRING
      },
      jawaban: {
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
    //membuat foreign key pada table user
    // await queryInterface.addConstraint('Hasilkuisioners', {
    //   fields: ['kuisioners_id'],
    //   type: 'foreign key',
    //   name: 'Kuisioners_fkey_users_id',
    //   references: {
    //     table: 'Kuisioners',
    //     field: 'id'
    //   }
    // });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Hasilkuisioners');
  }
};