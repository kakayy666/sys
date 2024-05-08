const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../config/db');
const connection = mysql.createConnection(MYSQL_CONFIG);

connection.connect();

// const sql = `select * from blogs;`;
// connection.query(sql, (err, result) => {
//     if(err)
//     {
//         console.error(err);
//         return
//     }
//     console.log('result',result)
// })
// function execSQL(sql,callback){
//    connection.query(sql,callback)
// }

function execSQL(sql){
    const promise = new Promise((resolve,reject)=>{
       connection.query(sql, (err, result) => {
           if (err) {
               reject(err)
                console.error(err);
                return}
           resolve(result)
        })
    })

    return promise
}

module.exports ={
    execSQL
}