const redis = require('redis');

const redisClient = redis.createClient({
    socket: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST
    }
});

redisClient.connect();

redisClient.on('ready', () => {
    console.log('Redis client connected');
});
  
redisClient.on('error', (err) => {
    console.error(`Redis client error: ${err}`);
});

module.exports = { redisClient }