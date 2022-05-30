const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  }, {
    timestamps: false
  });

  BlogPost.associate = (model) => {
    BlogPost.belongsTo(model.User, {
      as: 'user',
      foreignKey: 'userId',
      onDelete: 'cascade',
    });
  }

  return BlogPost;
};

module.exports = BlogPost;
