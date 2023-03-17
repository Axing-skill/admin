const jwt = require('jsonwebtoken')
const tokenSecret = require('../config/tokenSecretConfig')

/**
 * 
 * @param {*} encryption 加密内容
 * @param {*} time token 有效时间
 * @returns 
 */
const tokenGenerate = function (encryption, time) {
    return jwt.sign({ userID: encryption, time: new Date().getTime() }, tokenSecret, { expiresIn: time });
}

module.exports = tokenGenerate;