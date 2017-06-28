/**
 * Created by xrain on 2017/6/28.
 */
let mongoose = require('../utils/mongoose');
let userSchema = require('../schema/user');

let user = mongoose.model('User', userSchema);

/*userSchema.methods.findOneByUsername = function (username, callback) {
	return this.model('User').findOne({username: username}, callback);
}*/

module.exports = user;
