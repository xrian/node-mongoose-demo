/**
 * Created by xrain on 2017/6/28.
 */
let mongoose = require('../utils/mongoose');

let Schema = mongoose.Schema;
let userSchema = new Schema({
	nickname: String,
	username: String,
	mobile: String,
	age: { type: Number, min: 18, max: 99 },
	sex: Number,
	create_time: { type: Date, default: Date.now },
	update_time: { type: Date, default: Date.now },
	remarks: { type: String, default: '' }
});
module.exports = userSchema;
