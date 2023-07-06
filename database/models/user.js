const Sq = require('sequelize');
const DataTypes = Sq.DataTypes;
const mysql = require("../dbMysql");
const Post = require('./post.js');
const Comment = require('./comment.js');

const User = mysql.define('user',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        unique:true,
        primaryKey:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    nickname:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    },
    token : {
        type: DataTypes.STRING,
        allowNull:true 
    }
});


module.exports=User;