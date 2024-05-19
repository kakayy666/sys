const { SuccessModel, ErrorModel } = require('../model/responseModel');
const { UpdateUser } = require('../controller/user');

const handleUserRouter = (req, res) => {
    // console.log(req)
    const postData = req.body;
    console.log('postData',postData)
    
if (req.method === 'POST' && req.path === '/api/user/update') {
        const updateData = UpdateUser(postData)
        return updateData.then((result) => {
            return new SuccessModel(result);
        }).catch((err) => {
            return new ErrorModel(err);
        })    
}
  
}

module.exports = handleUserRouter;