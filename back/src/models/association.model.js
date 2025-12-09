const User = require('./users.model');
const Post = require('./post.model');

const defineAssociations = () => {
  User.hasMany(Post, { foreignKey: 'user_id', as: 'posts' });
  Post.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
};

module.exports = { defineAssociations };