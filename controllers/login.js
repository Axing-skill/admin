const loginModel = require("../modules/login");

class loginController {
    /**
     * 创建学生信息
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async find(ctx) {
        console.log(ctx.request.body);
        console.log(ctx.request.headers["authorization"]);
        ctx.response.body = 'login'
        ctx.response.body = await loginModel.findLogin(ctx.request.body)
    }
}

module.exports = loginController;