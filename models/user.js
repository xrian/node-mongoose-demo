/**
 * Created by xrain on 2017/6/28.
 */
let mongoose = require('../utils/mongoose');
let userSchema = require('../schema/user');

let user = mongoose.model('User', userSchema);

module.exports = user;
