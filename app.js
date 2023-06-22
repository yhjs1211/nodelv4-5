// Router 연결
const router = require('./routers/index.js');

/* 
DB import
1. DB mongo
2. DB MYSQL
*/
const mongo = require('./database/dbMongo.js'); // 1
const mysql = require('./database/dbMysql.js'); // 2

dbConnect('mysql');

//Models
const models = require('./models/index.js');

// Server
const express = require('express');
const config = require('./config.js');
const cookie = require('cookie-parser');

const app = express();

// req Data json 변환
app.use(express.json());
app.use(cookie());

//메인 페이지 URL 안내
app.get('/',(_,res)=>{
    res.status(200).json({
        1:"GET /posts",
        2:"POST /posts",
        3:"PUT /posts:_postId",
        4:"DELETE /posts:_postId",
        5:"POST /singup",
        6:"POST /login",
        7:"GET /logout"
    });
    res.end();
})

app.use('/',router);

async function dbConnect(dbType){
    if(dbType=='mongo'){
        await mongo().then(()=>{
            app.listen(config.host.port,()=>{
                console.log(`8081 is running...`);
            });
        });
    }else if(dbType=='mysql'){
        try {
            await mysql.sync();   
            app.listen(config.host.port,()=>{
                console.log(`8081 is running...`);
            });
        } catch (e) {
            console.error(e);
        }
    }
}