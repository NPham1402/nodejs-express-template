const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");

var timezone = require("dayjs/plugin/timezone");
const setDefaultTimeZone = (req, res, next) => {
  dayjs.extend(timezone);
  dayjs.extend(utc);
  dayjs.tz.setDefault("Asia/Ho_Chi_Minh");

  next();
};
module.exports = setDefaultTimeZone;
