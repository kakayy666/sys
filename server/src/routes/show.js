const { SuccessModel, ErrorModel } = require('../model/responseModel');
const { getshowList,getyearList } = require('../controller/show');
const handleShowRouter = (req, res) => {
    // console.log(req)
    const postData = req.body;
    if (req.method === 'GET' && req.path === '/api/show/kind') {
        const showListDataPromise = getshowList(postData);
        return showListDataPromise.then(showListData => {
            return new SuccessModel(showListData);
        });
    }

    if (req.method === 'GET' && req.path === '/api/show/year') {
        console.log('show/year')
         const yearListDataPromise = getyearList(postData);
        return yearListDataPromise.then(showListData => {
            return new SuccessModel(showListData);
        });
    }
} 

module.exports = handleShowRouter; 