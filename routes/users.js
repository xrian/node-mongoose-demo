var express = require('express');
var router = express.Router();

let UserModel = require('../models/user');


router.get('/', function (req, res, next) {
	let returnJson = {
		status: 0
	};
	UserModel.find({}, function (err, result) {
		if (err) {
			returnJson.msg = '查询失败,请刷新重试';
			res.json(returnJson);
		} else {
			returnJson.status = 1;
			returnJson.msg = 'success';
			returnJson.data = result;
			res.json(returnJson);
		}
	})
});

router.get('/:username', function (req, res, next) {
	let returnJson = {
		status: 0
	}
	let username = req.params.username;
	UserModel.findOne({ 'username': username }, function (err, result) {
		if (err) {
			console.log('查询失败.', err);
			res.json(returnJson);
		} else {
			returnJson.status = 1;
			returnJson.msg = 'success';
			returnJson.data = result;
			res.json(returnJson);
		}
	});
});

router.post('/', function (req, res, next) {
	let returnJson = {
		status: 0
	};
	let nickname = req.body.nickname;
	let username = req.body.username;
	let mobile = req.body.mobile;
	let age = Number(req.body.age);
	let sex = Number(req.body.sex);
	if (!nickname) {
		returnJson.msg = '昵称不能为空';
		res.json(returnJson);
		return;
	}
	if (!username) {
		returnJson.msg = '用户名不能为空';
		res.json(returnJson);
		return;
	}
	if (!/^1[3-8]\d{9}$/.test(mobile)) {
		returnJson.msg = '请输入正确格式的手机号码';
		res.json(returnJson);
		return;
	}
	if (isNaN(age)) {
		returnJson.msg = '请选择正确的年龄';
		res.json(returnJson);
		return;
	}
	if (age < 18) {
		returnJson.msg = '您还未满18,暂时无法注册';
		res.json(returnJson);
		return;
	}
	if (age > 99) {
		returnJson.msg = '您的年龄太大了,还是不要注册了把';
		res.json(returnJson);
		return;
	}
	if (sex < 0 || sex > 2) {
		returnJson.msg = '请选择性别';
		res.json(returnJson);
		return;
	}
	let user = {};
	user.nickname = nickname;
	user.username = username;
	user.mobile = mobile;
	user.age = age;
	user.sex = sex;
	user.remarks = '用户注册';
	UserModel.findOne({ 'username': username }, function (err, result) {
		if (err) {
			console.log('查询数据失败.', err);
			returnJson.msg = '系统繁忙,请稍后再试';
			res.json(returnJson);
		} else {
			if (result == null) {
				UserModel.create(user, function (err, result) {
					if (err) {
						console.log(err);
						returnJson.msg = '系统繁忙,请稍后再试';
						res.json(returnJson);
					} else {
						console.log('保存成功.', result);
						returnJson.status = 1;
						returnJson.msg = '注册成功';
						res.json(returnJson);
					}
				});
			} else {
				returnJson.msg = '该用户名已被注册,请更换用户名';
				res.json(returnJson);
			}
		}
	})
})

router.put('/:username', function (req, res, next) {
	let returnJson = {
		status: 0
	};
	let username = req.params.username;
	let nickname = req.body.nickname;
	let mobile = req.body.mobile;
	let age = Number(req.body.age);
	let sex = Number(req.body.sex);
	if (!nickname) {
		returnJson.msg = '昵称不能为空';
		res.json(returnJson);
		return;
	}
	if (!username) {
		returnJson.msg = '用户名不能为空';
		res.json(returnJson);
		return;
	}
	if (!/^1[3-8]\d{9}$/.test(mobile)) {
		returnJson.msg = '请输入正确格式的手机号码';
		res.json(returnJson);
		return;
	}
	if (isNaN(age)) {
		returnJson.msg = '请选择正确的年龄';
		res.json(returnJson);
		return;
	}
	if (age < 18) {
		returnJson.msg = '年龄不能小于18岁';
		res.json(returnJson);
		return;
	}
	if (age > 99) {
		returnJson.msg = '年龄不能大于99岁';
		res.json(returnJson);
		return;
	}
	if (sex < 0 || sex > 2) {
		returnJson.msg = '请选择性别';
		res.json(returnJson);
		return;
	}
	UserModel.findOne({ 'username': username }, function (err, result) {
		if (err) {
			console.log('查询报错', err);
			returnJson.msg = '系统繁忙,请稍后再试';
			res.json(returnJson);
		} else {
			if (result != null) {
				result.nickname = nickname;
				result.mobile = mobile;
				result.age = age;
				result.sex = sex;
				result.remarks = '用户注册';
				result.update_time = new Date();
				result.save(function (err, result) {
					if (err) {
						console.log(err);
						returnJson.msg = '系统繁忙,请稍后再试';
						res.json(returnJson);
					} else {
						console.log('保存成功.', result);
						returnJson.status = 1;
						returnJson.msg = '修改成功';
						res.json(returnJson);
					}
				});
			} else {
				returnJson.msg = '该用户不存在,无法修改';
				res.json(returnJson);
			}
		}
	})

})

router.delete('/:id', function (req, res, next) {
	let returnJson = {
		status: 0
	};
	let id = req.params.id;
	UserModel.findById(id, function (err, result) {
		if (err) {
			console.log('查询报错', err);
			returnJson.msg = '查询数据失败,请稍后再试';
			res.json(returnJson);
		} else {
			if (result == null) {
				returnJson.msg = '数据不存在,无法删除';
				res.json(returnJson);
			} else {
				UserModel.remove({ _id: id }, function (err, result) {
					if (err) {
						console.log('删除报错:', err);
						returnJson.msg = '删除失败,请刷新重试';
					} else {
						returnJson.status = 1;
						returnJson.msg = 'success';
					}
					res.json(returnJson);
				})
			}
		}
	})

})


module.exports = router;