const loginModel = require("../modules/login");
/**
 * 验证码
 */
const svgCaptcha = require('svg-captcha')
const svgCaptchaConfig = require('../config/svgCaptchaConfig')

class loginController {

    /**
     * 返回验证码
     * @param {*} ctx 
     */
    static async login(ctx) {
        const cap = svgCaptcha.create(svgCaptchaConfig)
        ctx.session.verificationCode = cap.text.toLowerCase() ;
        ctx.response.type = 'image/svg+xml';
        ctx.response.body = {
            status: 200,
            data: cap.data,
        };
    }


    /**
     * 校验用户登录信息
     */
    static async verificationLogin(ctx) {
        console.log('ctx.request.body',ctx.request.body);
        ctx.response.body = await loginModel.verificationLogin(ctx.request.body)
    }

}

module.exports = loginController;