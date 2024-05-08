const { SuccessModel, ErrorModel } = require('../model/responseModel');
const { getList,getDetail,createNewBlog,updateBlog } = require('../controller/blog');
const handleBlogRouter = (req, res) => {
    const postData = req.body;
    const id = req.query.id || '';
    
    if (req.method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const listData = getList(author, keyword);
        return  listData.then((result) => {
            console.log('result',result)
             return  new SuccessModel(result);
        })
        
    }

    if (req.method === 'GET' && req.path === '/api/blog/detail') {

        const detailData = getDetail(id);
        return new SuccessModel(detailData);
    }

    if(req.method==='POST' && req.path==='/api/blog/new')
    {
        const newblogData = createNewBlog(postData);
        return  new SuccessModel(newblogData);
    }

    if(req.method==='POST' && req.path==='/api/blog/update')
    {
        const updateData = updateBlog(id,postData);
        if(updateData)
        {
            return new SuccessModel('Updated Successfully');
        } else {
            return new ErrorModel('Update Failed');
        }

        console.log(req.body)
        return {
            message: '更新以下'
        }
    }

    if(req.method==='POST' && req.path==='/api/blog/delete')
    {
        return {
            message: 'This is the deleted blog'
        }
    }


}

module.exports = handleBlogRouter;