const { SuccessModel, ErrorModel } = require('../model/responseModel');
const { createNewForm } = require('../controller/form');
const handleBlogRouter = (req, res) => {
    const postData = req.body;
    if(req.method==='POST' && req.path==='/api/form/new')
    {
        const formDataPromise = createNewForm(postData);
        return formDataPromise.then(newFormData => {
            return new SuccessModel(newFormData);
        });
    }

    
}

module.exports = handleBlogRouter;