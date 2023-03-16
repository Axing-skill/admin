// 各页面路由
const LoginRouter = require('./login')

const combineRouters = require('koa-combine-routers')(LoginRouter)
module.exports = combineRouters