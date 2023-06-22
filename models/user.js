const Sq = require('sequelize');
const DataTypes = Sq.DataTypes;
const mysql = require("../database/dbMysql");

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
});


module.exports=User;