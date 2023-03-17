const sessionConfig = {
    key: 'koa:sess',
    maxAge: 60 * 1000 * 20,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: true,//每次访问将会重置过期时间
    renew: true
}

module.exports = sessionConfig