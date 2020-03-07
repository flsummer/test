const express = require('express');
const userRouter = require('./router/user')
const app = express();


function log_middleware(req,res,next){ 
    console.log('请求来了');
    next();
}
    app.use(log_middleware);
    app.use('/user', userRouter);
    // 加载一个内置的中间件
    app.use(express.static('static', {
        extensions: ['html', 'htm']
    }));

//中间件完整结构
// 1 函数
// err,req,res,next-->function
function demo_middleware(err,req,res,next){
    // 异常处理
    // 处理业务转交控制权 --next
    // 响应请求--结束相-->处理路由
}

function valid_name_middleware(err,req,res,next){
    let { name } = req.query; 
    console.log(name)
    if(!name || name.length){
        res.json({
            msg: 'no name'
        })
    }else {
        next();
    }
}
app.all('*', valid_name_middleware);


app.get('/test', (req, res)=>{
    res.json({
        msg: 'test',
    })
});

app.listen(3000, ()=>{
    console.log('start success')
});