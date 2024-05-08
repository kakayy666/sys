const querystring = require('querystring')
const handleBlogRouter = require('./src/routes/blog')
const loginRouter = require('./login')
const auth = require('./authorization')
const app = require('express')()
app.use("/api/login", loginRouter);
app.use("/api/*", auth.verifyToken); // 注册token验证中间件

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
    res.setHeader('Content-Type', 'application/json')
    const url = req.url;
    req.path = url.split('?')[0];
    console.log('req.path',req.path)
    // 解析query
    req.query = querystring.parse(url.split('?')[1])
    // 处理postData
    getPostData(req).then((postData) => {
        req.body = postData
        // 处理blog路由
        // console.log('req',req.body)
        const blogDataPromise = handleBlogRouter(req, res)
        if (blogDataPromise) {
            blogDataPromise.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
        
            
       
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.write('404 Not Found\n')
    res.end()
    })
}
    
module.exports = serverHandler;