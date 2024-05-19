const { SuccessModel, ErrorModel } = require('../model/responseModel');
const { getList,createNewUser } = require('../controller/login');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');


const handleLoginRouter = (req, res) => {
    // console.log(req)
    const postData = req.body;
    const { username, password } = postData;  
    const id = req.query.id || '';
    
    if (req.method === 'GET' && req.path === '/api/login/list') {
        const listData = getList();
        // console.log('listData',listData)
        return  listData.then((result) => {
            console.log('result',result)
             return  new SuccessModel(result);
        })
        
    }
    if(req.method==='POST' && req.path==='/api/login') 
    {   
        const listData = getList();
        console.log('login', username, password)
        return listData.then((result) => {
            // 将 RowDataPacket 对象转换为普通 JavaScript 对象
        const users = result.map(row => Object.assign({}, row));
        console.log('users', users);
        const usr = users.find(user => user.username === username && user.password === password);
        console.log('usr', usr);
             if (usr) {
                // 用户验证成功，生成 JWT token
                const token = jwt.sign({ id: usr.id, username: usr.username }, secretKey, { expiresIn: 3600 });
                return new SuccessModel({ token ,usr}); 
            } else {
                return new ErrorModel('User not found or password incorrect');
            }
        })
    }

    if (req.method === 'POST' && req.path === '/api/login/register') {
        const registerData = createNewUser(postData)
        return registerData.then((result) => {
            return new SuccessModel(result);
        }).catch((err) => {
            return new ErrorModel(err);
        })    
}
    if(req.method==='POST' && req.path==='/api/blog/delete')
    {
        return {
            message: 'This is the deleted blog'
        }
    }
}

module.exports = handleLoginRouter;