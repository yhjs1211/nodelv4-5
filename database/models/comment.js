const mysql = require('../dbMysql.js');
const DataTypes = require('sequelize').DataTypes;

const Comment = mysql.define('comment',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true,
        autoIncrement:true,
        primaryKey:true
    },
    nickname:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    comment:{
        type:DataTypes.TEXT,
        allowNull:false
    }
});

module.exports=Comment;