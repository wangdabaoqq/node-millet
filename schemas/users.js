/**
 * Created by king on 2017/1/10.
 */

//var mysql = require('mysql');
var mongoose = require('mongoose');
module.exports= new  mongoose.Schema({
    username:String,
    password:String,
    isAdmin:{
        typr:Boolean,
        default:false
    }
})