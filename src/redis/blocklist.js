const redis = require('redis');

const client = redis.createClient({ prefix: 'blocklist:' });
client.connect();

module.exports = client;
