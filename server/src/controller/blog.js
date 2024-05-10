const {execSQL} = require('../db/mysql')

const getList = (author, name) => {
    let sql = `select * from blogs `;
    if (author) {
        console.log('author',author)
        sql += ` where author ='${author}' `
    }
    if (name) {
        sql += ` where  name like '%${name}%' `
    }
    return  execSQL(sql)
    // return [{
    //     id: 1,
    //     title: 'Title 1',
    //     content: 'Content 1',
    //     createTime: 1605180000000,
    //     auther: 'Author 1'
    // }, {
    //     id: 2,
    //     title: 'Title 2',
    //     content: 'Content 2',
    //     createTime: 1605180000000,
    //     auther: 'Author 2'
    // }]
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