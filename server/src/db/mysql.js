const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../config/db');

// 创建连接池而不是单个连接
const pool = mysql.createPool({
    ...MYSQL_CONFIG,
    // 添加连接池选项
    connectionLimit: 10, // 连接池大小
});

function execSQL(sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }

            connection.query(sql, (err, result) => {
                connection.release(); // 释放连接到连接池中
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    });
}

module.exports = {
    execSQL
};
