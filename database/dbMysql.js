const Sq = require('sequelize');
const config = require('../config');

const {host,database,password,username} = config.db;

const mysql = new Sq.Sequelize(database,username,password,{
    host:host,
    dialect:'mysql'
});

module.exports=mysql;