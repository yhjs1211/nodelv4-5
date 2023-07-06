const mysql = require('../dbMysql.js');

const Like = mysql.define('like',{},{timestamps:false});

module.exports=Like;