/**
 * Created by xrain on 2017/6/28.
 */
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://127.0.0.1:27017/test');

module.exports = mongoose;