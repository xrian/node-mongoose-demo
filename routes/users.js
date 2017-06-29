var express = require('express');
var router = express.Router();

let UserModel = require('../models/user');


router.get('/', function (req, res, next) {
	let returnJson = {
		status: 0
	};
	let promise = new Promise(function (resolve, reject) {
		UserModel.find({}, function (err, result) {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		})
	});
	promise.then(function (result) {
		returnJson.status = 1;
		returnJson.msg = 'success';
		returnJson.data = result;
		res.json(returnJson);
	}).catch(function (err) {
		console.log(err);
		returnJson.msg = '查询失败,请刷新重试';
		res.json(returnJson);
	})
});

router.get('/:username', function (req, res, next) {
	let returnJson = {
		status: 0
	}
	let username = req.params.username;
	let promise = new Promise(function (resolve, reject) {
		UserModel.findOne({ 'username': username }, function (err, result) {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	})
	promise.then(function (result) {
		returnJson.status = 1;
		returnJson.msg = 'success';
		returnJson.data = result;
		res.json(returnJson);
	}).catch(function (err) {
		console.log('查询失败.', err);
		returnJson.msg('查询失败,请刷新重试');
		res.json(returnJson);
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

	let findOnePromise = new Promise(function (resolve, reject) {
		UserModel.findOne({ 'username': username }, function (err, result) {
			if (err) {
				console.log('查询数据失败.', err);
				reject('系统繁忙,请稍后再试');
			} else {
				if (result == null) {
					resolve(result);
				} else {
					reject('该用户名已被注册,请更换用户名');
				}
			}
		})
	})
	findOnePromise.then(function (result) {
		return new Promise(function (resolve, reject) {
			UserModel.create(user, function (err, result) {
				if (err) {
					console.log(err);
					reject('系统繁忙,请稍后再试');
				} else {
					resolve(result);
				}
			});
		})
	}).then(function (result) {
		console.log('保存成功.', result);
		returnJson.status = 1;
		returnJson.msg = '注册成功';
		res.json(returnJson);
	}).catch(function (err) {
		returnJson.msg = err;
		res.json(returnJson);
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

	let promise = new Promise(function (resolve, reject) {
		UserModel.findOne({ 'username': username }, function (err, result) {
			if (err) {
				console.log('查询报错', err);
				reject('系统繁忙,请稍后再试');
			} else {
				if (result != null) {
					result.nickname = nickname;
					result.mobile = mobile;
					result.age = age;
					result.sex = sex;
					result.remarks = '用户注册';
					result.update_time = new Date();
					resolve(result);
				} else {
					reject('该用户不存在,无法修改');
				}
			}
		})
	})
	promise.then(function (result) {
		return new Promise(function (resolve, reject) {
			result.save(function (err, results) {
				if (err) {
					console.log(err);
					reject('系统繁忙,请稍后再试');
				} else {
					console.log('保存成功.', results);
					resolve();
				}
			});
		})
	}).then(function () {
		returnJson.status = 1;
		returnJson.msg = '修改成功';
		res.json(returnJson);
	}).catch(function (err) {
		returnJson.msg = err;
		res.json(returnJson);
	})


})

router.delete('/:id', function (req, res, next) {
	let returnJson = {
		status: 0
	};
	let id = req.params.id;
	let promise = new Promise(function (resolve, reject) {
		UserModel.findById(id, function (err, result) {
			if (err) {
				console.log('查询报错', err);
				reject('查询数据失败,请稍后再试');
			} else {
				if (result == null) {
					reject('数据不存在,无法删除');
				} else {
					resolve(id);
				}
			}
		})
	})
	promise.then(function (id) {
		return new Promise(function (resolve, reject) {
			UserModel.remove({ _id: id }, function (err, result) {
				if (err) {
					console.log('删除报错:', err);
					reject('删除失败,请刷新重试');
				} else {
					resolve();
				}
			})
		})
	}).then(function () {
		returnJson.status = 1;
		returnJson.msg = '保存成功';
		res.json(returnJson);
	}).catch(function (err) {
		returnJson.msg = err;
		res.json(returnJson);
	})


})


module.exports = router;