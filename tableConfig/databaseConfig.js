const postgres = require("postgres");

const databaseConfig = () => {
  return postgres(process.env.CONNECTIONSTING_DATABASE_URL);
};
module.exports = databaseConfig;
