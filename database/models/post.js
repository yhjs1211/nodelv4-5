const Sq = require('sequelize');
const DataTypes = Sq.DataTypes;
const mysql = require("../dbMysql");

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
    },
    likewho:{
        type:DataTypes.TEXT({length:"long"})
    },
});



module.exports=Post;