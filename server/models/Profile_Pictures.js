module.exports = (sequelize, DataTypes) => {
  const Profile_Pictures = sequelize.define('Profile_Pictures', {
    image: {
      type: DataTypes.TEXT('long'),
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Profile_Pictures;
};
