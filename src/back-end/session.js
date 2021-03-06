
const redis = require("redis");
const {promisify} = require('util');
const c = null;
module.exports = function () {
    return new Promise(res=>{
        c = redis.createClient();
        const set = promisify(c.hset).bind(c);
        const del = promisify(c.hdel).bind(c);
        const get = promisify(c.hget).bind(c);
        c.rosa = {};
        c.on("error", function (err) {
            console.log("Error " + err);
        });
        c.setCaptcha = (id,number) => {
            return new Promise(res=>{
                set("captcha",id,number).then(res)
            })
        }
        c.getCaptcha = (id) => {
            return new Promise(res=>{
                get("captcha",id).then(res)
            })
        }
        c.delCaptcha = (id) => {
            return new Promise(res=>{
                del("captcha",id);
            })
        }
        c.on("ready",()=>{
            res(c);
        });
    })
}