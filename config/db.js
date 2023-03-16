const { Sequelize } = require('sequelize');
const db = new Sequelize('admin','root','123456',{
    host:'localhost',
    dialect:'mysql',
    operatorsAliases:false,
    dialectOptions:{
        //字符集
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
 
module.exports =  db;