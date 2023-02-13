module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dislikes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: 'cascade',
    });
  };
  Posts.associate = (models) => {
    Posts.hasMany(models.PostLikes, {
      onDelete: 'cascade',
    });
  };
  return Posts;
};
