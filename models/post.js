const Sq = require('sequelize');
const DataTypes = Sq.DataTypes;
const mysql = require("../database/dbMysql");
const User = require('./user.js');

const Post = mysql.define('post',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        unique:true,
        primaryKey:true
    },
    nickname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    content:{
        type:DataTypes.TEXT
    }
});

Post.belongsTo(User);


module.exports=Post;