// 使用koa
// const koa = require('koa')
// const router = require('koa-router')()
// // koa-websocket是koa封装好的websocket功能
// const websocket = require('koa-websocket')
// // 实例化一个ws服务
// const app = websocket(new koa())

// // 用来存储建立了的链接，（真实项目中请使用数据库代替）
// let wsObj = {}

// // 监听koa/ws路由，是否有连接
// router.all('/koa/ws', (ctx) => {
//     // 客户端链接传过来的客户端身份
//     const { id } = ctx.query
//     // 将链接保存起来
//     wsObj[id] = ctx;
//     // 给客户端发送链接成功信息
//     ctx.websocket.send('连接成功');
//     // 监听客户端发送过来的信息
//     ctx.websocket.on('message', function(message) {
//         console.log('message',message);
//         // uid为接收方，将接收到的信息发送给接收方uid,可以根据自己的需求处理数据再发送
//         const uid = JSON.parse(message).uId;
//         console.log(wsObj[uid]);
//         if(!wsObj[uid]){
//             ctx.websocket.send(`${uid}未上线`)
//         }else{
//             wsObj[uid].websocket.send(message)
//         }
//     });
// })

// // 使用路由
// app.ws.use(router.routes()).use(router.allowedMethods())

// //端口号后面可采用动态的
// app.listen(3000, () =>
//     console.log('服务启动成功,http://localhost:3000')
// )


// =======================================


const WebSocket = require('ws');
const session = require('koa-session')
const sessionConfig = require('./config/sessionConfig')
const Koa = require('koa'); // 引入koa
const Router = require('koa-router'); // 引入koa-router
const json = require('koa-json');
const uuid = require('uuid');
const { koaBody } = require('koa-body')
var qr = require('qr-image');
const app = new Koa(); // 创建koa应用
const router = new Router(); // 创建路由，支持传递参数


app.keys = ['some secret hurr'];  // cookie 密钥
app.use(session(sessionConfig, app))  //启动session

app.use(json());

app.use(koaBody({
    multipart: true,
    Formidable: {
        maxFileSize: 20010241024
    }
}))

// 指定一个url匹配
router.post('/ws', async (ctx) => {
    ctx.response.body = JSON.stringify('ws 连接成功')
    if(ctx.request.body.uuid === null || !ctx.session.uuidList.includes(ctx.request.body.uuid)) {
        var ws = new WebSocket.Server({ path:'/ws', port: 3001});
        ctx.session.uuidList.push(uuid.v4())
        ws.on('connection', (ws) => {
            console.log("服务器ws 连接成功");
            ws.send(JSON.stringify({
                uuid: ctx.session.uuidList[ctx.session.uuidList.length-1],
                status: 200
            }))
    
            ws.on('message', function (message) {
                console.log(JSON.parse(message));
                if(ctx.session.uuid === JSON.parse(message)) {
                    ws.send(JSON.stringify({
                        status: 200,
                        message: "登录成功"
                    }))
                }
            })
    
            ws.on('close',(ws) => {
                console.log("服务器ws 关闭");
            })
        })
    }
})


//获取二维码
// router.get('/qrcode',async (ctx)=>{
//     ctx.session.uuidList = []
//     try {
//         var img = qr.image('点开就是承认华华是只臭猪',{size :5});
//         ctx.type= 'image/png';
//         ctx.body = img;
//     } catch (e) {
//         ctx.type='text/html;charset=utf-8';
//         ctx.body='<h1>414 Request-URI Too Large</h1>';
//     }
// })


app.use(router.routes()).use(router.allowedMethods());


app.listen(3000, () => {
    console.log('应用已经启动，http://localhost:3000');
})


