const LoginRouter = require('koa-router')()
const loginController = require('../controllers/login');
// 学生
// const LoginController = require('../controllers/Login');

LoginRouter.prefix('/login')

LoginRouter.post('/', loginController.find);

module.exports = LoginRouter