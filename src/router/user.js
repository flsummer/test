const express = require('express');
const router = express.Router(); // 路由对象

router.use(function(req, res, next){
    console.log('form router');
    next();
})

function valid_login(req, res, next){
    const { name, password } = req.query;
    if(!name || !password){
        res.json({
            msg: '参数错误',
        });
    }else {
        req.formdata = {
            name,
            password,
        }
        next();
    }
}

router.get('/login', [valid_login], (req, res)=>{
    let { formdata } = req;
    res.json({
        formdata,
        msg: 'form router demo'
    })
});

module.exports = router;