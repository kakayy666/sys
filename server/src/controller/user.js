const { execSQL } = require('../db/mysql');

const upUser = () => {
    let sql = `SELECT * FROM users`;

    return execSQL(sql);
}

const UpdateUser = (postData) => {

    return new Promise((resolve, reject) => {
        for (let key in postData) {
            const { id, username, password, level } = postData[key];
            const sql = `UPDATE users SET username='${username}', password='${password}', level='${level}' WHERE id=${id}`;
            execSQL(sql).then((result) => {
                resolve("success");
            }).catch((err) => {
                reject(err);
            });
        }
    });
}

module.exports = {
    upUser,
    UpdateUser
}
 