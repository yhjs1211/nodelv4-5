const User = require("./user.js");
const Post = require("./post.js");
const Comment = require('./comment.js');


User.hasMany(Post);
User.hasMany(Comment);

Post.belongsTo(User);
Comment.belongsTo(User);

User.belongsToMany(Post, {through: 'like'});
Post.belongsToMany(User, {through: 'like', as:'LikeUser', timestamps:false});

module.exports=[User,Post,Comment];