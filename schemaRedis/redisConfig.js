const { createClient } = require("redis");

const redisClientConfig = () => {
  const client = createClient({
    url: process.env.CONNECTIONSTING_DATABASE_URL_REDIS,
  });

  return client;
};

module.exports = redisClientConfig;
