const redis = require('redis');

console.log(process.env.REDIS_PORT, process.env.REDIS_HOST);

const redisClient = redis.createClient({
    port: process.env.REDIS_PORT,
    //host: process.env.REDIS_HOST,
    host: '127.0.0.1'
});

redisClient.on('ready', () => {
    console.log('Redis client connected');
});
  
redisClient.on('error', (err) => {
    console.error(`Redis client error: ${err}`);
});

module.exports = { redisClient }