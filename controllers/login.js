const loginModel = require("../modules/login");
/**
 * 验证码
 */
const svgCaptcha = require('svg-captcha')
const svgCaptchaConfig = require('../config/svgCaptchaConfig')

/**
 * 二维码
 */
var qr = require('qr-image');

/**
 * WebSocket
 */
const WebSocket = require('ws');
const uuid = require('uuid');
class loginController {

    /**
     * 返回验证码
     * @param {*} ctx 
     */
    static async getVerificationCode(ctx) {
        const cap = svgCaptcha.create(svgCaptchaConfig)
        ctx.session.verificationCode = cap.text.toLowerCase();
        ctx.response.type = 'image/svg+xml';
        ctx.response.body = {
            status: 200,
            data: cap.data,
        };
    }

    /**
     * 获取二维码
     * @param {*} ctx 
     */
    static async getQRcode(ctx) {
        ctx.session.uuidList = []
        try {
            var img = qr.image('点开就是承认华华是只臭猪', { size: 5 });
            console.log('getQRcode');
            ctx.type = 'image/png';
            ctx.body = img;
        } catch (e) {
            ctx.type = 'text/html;charset=utf-8';
            ctx.body = '<h1>414 Request-URI Too Large</h1>';
        }
    }

    /**
     * 创建websocket
     */
    static async createLoginWebsocket(ctx) {
        ctx.response.body = JSON.stringify('ws 连接成功')
        console.log("ctx.session.uuidList",ctx.session.uuidList);
        console.log("ctx.request.body.uuid",ctx.request.body);
        if (ctx.request.body.uuid === 'undefined' || !ctx.session.uuidList.includes(ctx.request.body.uuid)) {
            var ws = new WebSocket.Server({ path: '/ws', port: 3001 });
            ctx.session.uuidList.push(uuid.v4())
            ws.on('connection', (ws) => {
                console.log("服务器ws 连接成功");
                ws.send(JSON.stringify({
                    uuid: ctx.session.uuidList[0],
                    status: 200
                }))
                ws.on('message', function (message) {
                    console.log('message',JSON.parse(message));
                    if (ctx.session.uuidList[0] === JSON.parse(message)) {
                        ws.send(JSON.stringify({
                            status: 200,
                            message: "登录成功"
                        }))
                    }
                })
                ws.on('close', (ws) => {
                    console.log("服务器ws 关闭");
                })
            })
        }
    }

    /**
     * 校验用户登录信息
     */
    static async verificationUserLogin(ctx) {
        console.log('ctx.request.body', ctx.request.body);
        ctx.response.body = await loginModel.verificationUserLogin(ctx.request.body)
    }

}

module.exports = loginController;