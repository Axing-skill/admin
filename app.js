const Koa = require('koa')
const { koaBody } = require('koa-body')
const jwt = require('koa-jwt');
const session = require('koa-session')
const tokenSecret = require('./config/tokenSecretConfig')
const sessionConfig = require('./config/sessionConfig')
const app = new Koa()



app.keys = ['some secret hurr'];  // cookie 密钥

app.use(session(sessionConfig, app))  //启动session


// 2. 中间件注册
app.use(jwt({ secret: tokenSecret }).unless({
    path: [/^\/login/]  // 设置白名单
}));


// 1. 错误信息处理
app.use(async (ctx, next) => {
    return await next().catch((err) => {
        console.log('err',err);
      if (err.status === '401') {
        ctx.body = {
          code: 401,
          message: '用户鉴权失败',
        };
      } else {
        throw err;  // 向前端抛出一个错误
      }
    });
})


/**
 * post body 解析
 */
app.use(koaBody({
    multipart: true,
    Formidable: {
        maxFileSize: 20010241024
    }
}))



/**
 * 路由
 */
const combineRouters = require('./routes/index')
app.use(combineRouters())

module.exports = app

// =============================================================





