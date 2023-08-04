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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.TEXT('long'),
    },
    createdAt: {
      type: DataTypes.DATEONLY,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Posts, {
      onDelete: 'cascade',
    });

    Users.associate = (models) => {
      Users.hasOne(models.Profile_Pictures, {
        onDelete: 'cascade',
      });
    };
  };
  return Users;
};
