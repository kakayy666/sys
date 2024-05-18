const querystring = require('querystring')
const express = require('express');
const handleBlogRouter = require('./src/routes/blog')
const handleLoginRouter = require('./src/routes/login')
const app = express();
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if(req.method !== 'POST')
        {   
            resolve({})
            return
        }
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString()
        })

        req.on('end', () => {
            if(!postData)
            {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise
}

const serverHandler = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080','http://47.100.180.85');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许 Authorization 头
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // 如果是预检请求，直接返回状态码 200
    if (req.method === 'OPTIONS') {
        res.statusCode = 200;
        res.end();
        return;
    }
    res.setHeader('Content-Type', 'application/json')
    const url = req.url;
    req.path = url.split('?')[0];
    console.log('req.path', req.path)
    console.log('req.method', req.method)
    // 解析query
    req.query = querystring.parse(url.split('?')[1])
    // 处理postData
getPostData(req).then((postData) => {

    req.body = postData 
        if (req.path.startsWith('/api/login')) { 
            console.log('登录')
            console.log('req',req.body)
            const loginDataPromise = handleLoginRouter(req, res)
            //  console.log('loginDataPromise',loginDataPromise)
            if (loginDataPromise) { 
                loginDataPromise.then(loginData => {
                    res.end(
                        JSON.stringify(loginData)
                    )
                })
                return
            }
        }
          const token = req.headers['authorization'];
        // 验证 token 的合法性
    if (req.path.startsWith('/api/blog')) {
            if (!token) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Unauthorized - Token not provided' }));
            return;
        }
            // 处理blog路由
            const blogDataPromise = handleBlogRouter(req, res)
            if (blogDataPromise) {
                blogDataPromise.then(blogData => {
                    res.end(
                        JSON.stringify(blogData)
                    )
                })
                return
            }
        }
        
            
       
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.write('404 Not Found\n')
    res.end()
    })
}

app.use(serverHandler)



    
module.exports = serverHandler;
