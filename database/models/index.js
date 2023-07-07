const User = require("./user.js");
const Post = require("./post.js");
const Comment = require('./comment.js');
const Like = require('./like.js');

User.hasMany(Post);
User.hasMany(Comment);

Post.belongsTo(User);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

User.belongsToMany(Post, {through: Like,foreignKey:"userId"});
Post.belongsToMany(User, {through: Like, as:'LikeUser' ,foreignKey:"postId"});

Like.hasMany(Post,{foreignKey:"id"});
Like.hasMany(User,{foreignKey:"id"});

module.exports=[User,Post,Comment,Like];