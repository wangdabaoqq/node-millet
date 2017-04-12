/**
 * Created by king on 2017/1/10.
 */
var express = require('express');
var crypto = require('crypto');
var swig = require('swig');
var cache = require('cache-control');
var mysql = require('mysql');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Cookies = require('cookies');
var session = require('express-session');
var Geetest = require('./gt-sdk');
var app = express();

//极验验证
app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true
}));

// pc 端接口

var captcha1 = new Geetest({
    geetest_id: '48a6ebac4ebc6642d68c217fca33eb4d',
    geetest_key: '4f1c085290bec5afdc54df73535fc361'
});
app.get("/gt/register1", function (req, res) {
    // 向极验申请每次验证所需的challenge
    captcha1.register({
        client_type: 'unknown',
        ip_address: 'unknown'
    }, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            req.session.fallback = true;
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            req.session.fallback = false;
            res.send(data);
        }
    });
});

app.post("/gt/form-validate1", function (req, res) {

    // 对form表单提供的验证凭证进行验证
    captcha1.validate(req.session.fallback, {

        geetest_challenge: req.body.geetest_challenge,
        geetest_validate: req.body.geetest_validate,
        geetest_seccode: req.body.geetest_seccode

    }, function (err, success) {

        if (err) {
            // 网络错误
            res.send(err);

        } else if (!success) {

            // 二次验证失败
            res.send("<h1 style='text-align: center'>登录失败</h1>");

        } else {
            res.send("<h1 style='text-align: center'>登录成功</h1>");
        }

    });
});

var captcha2 = new Geetest({
    geetest_id: '002bc30ff1eef93e912f45814945e752',
    geetest_key: '4193a0e3247b82a26f563d595c447b1a'
});

app.get("/gt/register2", function (req, res) {

    // 向极验申请每次验证所需的challenge
    captcha2.register({
        client_type: 'unknown',
        ip_address: 'unknown'
    }, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            req.session.fallback = true;
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            req.session.fallback = false;
            res.send(data);
        }
    });
});

app.post("/gt/ajax-validate2", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    captcha2.validate(req.session.fallback, {

        geetest_challenge: req.body.geetest_challenge,
        geetest_validate: req.body.geetest_validate,
        geetest_seccode: req.body.geetest_seccode

    }, function (err, success) {

        if (err) {

            // 网络错误
            res.send({
                status: "error",
                info: err
            });

        } else if (!success) {

            // 二次验证失败
            res.send({
                status: "fail",
                info: '登录失败'
            });
        } else {

            res.send({
                status: "success",
                info: '登录成功'
            });
        }
    });
});
app.use(cache({
    './index.html':1000,
    '/none/**/*.html': false,
    //'/private.html': 'private, max-age=300',
    'Cache-Control': 'max-age= 31536000, public',
    'Content-Type': 'image/png',
    'ETag': "666666",
    'Expires': 'Mon, 07 Sep 2026 09:32:27 GMT',
    '/**': 500 // Default to caching all items for 500
}));
app.use(session({
  secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: 60 * 1000 }
}));
app.use('/public',express.static(__dirname + '/public'));
app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('view engine','html');
swig.setDefaults({cache:false});
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req,res,next) {
   req.cookies = new Cookies(req,res);
   //console.log(req.cookies.get('userInfo'));

    req.userInfo = {};
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
        }catch(e){

        }
    }
   next();
});
app.use('/login',require('./routers/login'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));
app.use('/register',require('./routers/register'));
app.use('/personal',require('./routers/personal'));
/*
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'hk8049.hndan.com',
    user: 'a1213081014',
    password: '60cb693c',
    database:'a1213081014'
});

connection.connect();
//查询
connection.query('select * from `task_43398`', function(err, rows, fields) {
    if (err) throw err;
    console.log('查询结果为: ', rows);
});
//关闭连接
connection.end();
*/

mongoose.connect('mongodb://localhost:27016/xiaomi',function(err) {
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
        app.listen(80,'120.25.235.101');
    }
});

