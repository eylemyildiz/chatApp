const redis = require('redis');

const getCleint = ()=>{
    return redis.createClient({
        host: process.env.REDIS_URI,
        port: process.env.REDIS_PORT
    });
};

module.exports.getClient = getCleint;