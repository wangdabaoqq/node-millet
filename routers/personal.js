/**
 * Created by king on 2017/1/23.
 */
var express = require('express');
var router = express.Router();
router.get('/',function(req,res,next) {
    console.log(req.userInfo.username);
    res.render('main/personal',{
        userInfo:req.userInfo
    });
});

module.exports = router;