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

const createNewBlog = (postData) => {
    console.log(postData)
    // title content id
    return {
        id: 3
    }
}

const updateBlog = (id, blogData = {}) => {
    console.log('id',id)

    return true

}
module.exports = {
    getList,
    getDetail,
    createNewBlog,
    updateBlog
}