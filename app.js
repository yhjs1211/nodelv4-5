// Router 연결
const router = require('./routers/index.js');

/* 
DB MYSQL
*/

const mysql = require('./database/dbMysql.js');

//Models
const models = require('./database/models/index.js');

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

(async ()=>{
    try {
        await mysql.sync();   
        app.listen(config.host.port,()=>{
            console.log(`8081 is running...`);
        });
    } catch (e) {
        console.error(e);
    }
})();
