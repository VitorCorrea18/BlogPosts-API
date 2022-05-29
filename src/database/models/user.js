const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    timestamps: false
  });

  User.associate = (model) => {
    User.hasMany(model.BlogPost, {
      as: 'blogPost',
      foreingKey: 'userId',
      onDelete: 'cascade',
    });
  }

  return User;
};

module.exports = User;
