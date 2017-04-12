/**
 * Created by king on 2017/1/10.
 */
var mongoose = require('mongoose');
var userSchema = require('../schemas/users');
module.exports = mongoose.model('User',userSchema);