const { DataTypes } = require('sequelize');
// // 引入sequelize对象
const db = require('../config/dbConfig');
// // 引入数据表模型
const login = require('../schema/login')(db, DataTypes);    // 数据值

// const jwt = require('jsonwebtoken')
const tokenGenerate = require('../utils/TokenGenerate')

class loginModel {
    /**
     * 校验用户登录信息
     * @param {*} requestBody 
     * @returns 
     */
    static async verificationLogin(requestBody) {
        var responseBody;
        var currentLogin;
        try {
            currentLogin = await login.findOne({
                where: {
                    username: requestBody.username
                }
            });
        } catch (e) {
            responseBody = {
                status: 500,
                message: "数据库查询失败"
            }
            throw Error(e);
        }
        if (currentLogin.password === requestBody.password) {
            responseBody = {
                status: 200,
                message: "登陆成功",
                data: {
                    token: tokenGenerate(requestBody.username, '1h')
                }
            }
        } else {
            responseBody = {
                status: 401,
                message: "密码/账号错误，请重新登录"
            }
        }
        return responseBody;
    }
}

module.exports = loginModel;