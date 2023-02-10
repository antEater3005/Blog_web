module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    CommentBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Comments;
};
