const {execSQL} = require('../db/mysql')

const getList = () => {
    let sql = `select * from users `;

    return  execSQL(sql)

}

const getDetail = (id) => {
    return {
        id: 1,
        title: 'Title 1',
        content: 'Content 1',
        createTime: 1605180000000,
        auther: 'Author 1'
    }
}

const createNewUser = (postData) => {
    const { username, password } = postData;

    // 首先检查用户名是否已经存在
    const checkSql = `SELECT * FROM users WHERE username = '${username}'`;

    return execSQL(checkSql).then(users => {
        if (users.length > 0) {
            // 如果用户名已经存在，返回一个错误
           return Promise.reject('User already exists');
        } else {
            // 如果用户名不存在，插入新的用户
            const insertSql = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
            return execSQL(insertSql);
        }
    });
}

const updateBlog = (id, blogData = {}) => {
    console.log('id',id)

    return true

}
module.exports = {
    getList,
    getDetail,
    createNewUser,
    updateBlog
}