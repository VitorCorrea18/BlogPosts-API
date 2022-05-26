'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostCategories', {
      postId: {
        allowNull: false,
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
        type: Sequelize.INTEGER
      },
      categoryId: {
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
        },
        type: Sequelize.INTEGER
      }
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostCategories');
  }
};
