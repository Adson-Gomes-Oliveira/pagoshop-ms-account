const redis = require('redis');

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: '6379',
  },
  prefix: 'blocklist:',
});

client.connect();

module.exports = client;
