/**
 * Created by king on 2017/1/10.
 */
/**
 * Created by king on 2017/1/10.
 */
var express = require('express');
var router = express.Router();
//var crypto  = require('crypto');
//var sha1 = crypto.createHash('sha1');
var md5 = require('md5');
var User = require('../models/User');


var responseData;
router.use(function(req,res,next) {
    responseData = {
        code: 0,
        message:''
    }
    next();
});


router.post('/user/register',function(req, res, next) {
    var username = req.body.username;
    //sha1.updatezcc(zhanghao);
    //console.log(username);
    var password = req.body.password;
    //var password = md5.update('mima').digest('base64');
   // sha1.update(mima);
    //var password = sha1.digest('hex');
    var repassword = req.body.repassword;
    //var repassword = md5.update('chongfu').digest('base64');
    //sha1.update(chongfu);
    var sjh = /^1\d{10}$/;
    var yx = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    var mm = /^(\w){6,20}$/;
    if (username == '') {
        responseData.code = 1;
        responseData.message = '你整个空的吓唬谁<(￣︶￣)>';
        res.json(responseData);
        return;
    }
    if(!(sjh.test(username)|| yx.test(username))){
        responseData.code = 7;
        responseData.message = '千万别用邮箱与手机号,不用你就不能注册。好气啊╮（╯◇╰）╭';
        res.json(responseData);
        return;
    }
    if(!(mm.test(password))){
        responseData.code = 6;
        responseData.message = '一定要复杂,要不然你不能注册,呼呼（＿　＿）';
        res.json(responseData);
        return;
    }
    if (password == '') {
        responseData.code = 2;
        responseData.message = '吓死我了,竟然空的︽⊙＿⊙︽';
        res.json(responseData);
        return;
    }
    if (repassword != password) {
        responseData.code = 3;
        responseData.message = '眼睛睁大一点(⊙?⊙)';
        res.json(responseData);
        return;
    }
    User.findOne({
        username: username
    }).then(function (userInfo) {
        if (userInfo) {
            responseData.code = 4;
            responseData.message = '被注册了吧活该o(*≧▽≦)ツ';
            res.json(responseData);
            return;
        }
        /*var username = md5(username);
        var password = md5(password);
        var repassword = md5(repassword);*/
        var user = new User({
            username : username,
            password : password
        });
        return user.save();
    }).then(function(newUserInfo) {
        responseData.message = '快偷着高兴吧(ΘωΘ)';
        res.json(responseData);
    })
});
/*登录*/
router.get('/',function (req,res,next) {
    res.render('main/login');
})
router.post('/user/login',function (req,res) {
    var username = req.body.username;
    var password = req.body.password;
    if(username == '' ){
        responseData.code = 1;
        responseData.message = "哎空的⊙０⊙";
        res.json(responseData);
        return;
    }
    if(password == '' ){
        responseData.code = 2;
        responseData.message = "漂亮,有点高兴(^o^)／";
        res.json(responseData);
        return;
    }
    User.findOne({
        username : username,
        password : password
    }).then(function (userInfo) {
        if(!userInfo){
            responseData.code = 3;
            responseData.message = '要不你再想想,想也是错的≡(▔﹏▔)≡';
            res.json(responseData);
            return;
        }
        /*username = md5(username);
        password = md5(password);*/
        responseData.message = '进来看看⊙﹏⊙';

        responseData.userInfo = {
            _id : userInfo._id,
            username : userInfo.username
        }
        req.cookies.set('userInfo',JSON.stringify({
            _id : userInfo._id,
            username:userInfo.username
        }));
        res.json(responseData);
        return;
    })
});

router.get('/user/logout',function (req,res) {
    req.cookies.set('userInfo',null);
    res.json(responseData);
})

module.exports = router;
