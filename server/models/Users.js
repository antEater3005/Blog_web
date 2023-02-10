module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Posts, {
      onDelete: 'cascade',
    });
  };
  return Users;
};
