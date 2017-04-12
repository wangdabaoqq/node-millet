/**
 * Created by king on 2017/1/10.
 */
var express = require('express');
var router = express.Router();
router.get('/',function(req,res,next) {
    console.log(req.userInfo.username);
    res.render('main/index',{
        userInfo:req.userInfo
    });
});

module.exports = router;