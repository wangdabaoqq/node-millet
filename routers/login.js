/**
 * Created by king on 2017/1/10.
 */
var express = require('express');
var router = express.Router();

router.get('/',function (req,res,next) {
    res.render('main/login', {
        userInfo:req.userInfo
    });
});
module.exports = router;