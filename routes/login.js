const LoginRouter = require('koa-router')()
const loginController = require('../controllers/login');
// 学生
// const LoginController = require('../controllers/Login');

LoginRouter.prefix('/login')

LoginRouter.get('/', loginController.login);
LoginRouter.post('/', loginController.login);

module.exports = LoginRouter