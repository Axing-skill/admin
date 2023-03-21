const LoginRouter = require('koa-router')()
const loginController = require('../controllers/login');


LoginRouter.prefix('/login')

LoginRouter.get('/verificationCode', loginController.getVerificationCode);
LoginRouter.get('/qrcode',loginController.getQRcode)
LoginRouter.post('/ws',loginController.createLoginWebsocket)
LoginRouter.post('/', loginController.verificationUserLogin);

module.exports = LoginRouter