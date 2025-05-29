var express = require("express");
const {
  getAllLogWithDateandStatusQuery,
  postLogToTableQuery,
} = require("../tableConfig/log/log");
const {
  insertLoggingToList,
  loadingAndAnalynsLogging,
} = require("../schemaRedis/Logging/Log");
var router = express.Router();

router.get("/db1", function (req, res) {
  getAllLogWithDateandStatusQuery().then((result) => {
    res.status(result.status).json(result.data);
  });
});
router.post("/db1", function (req, res) {
  const bodyData = req.body;
  postLogToTableQuery(bodyData).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.post("/db2", function (req, res) {
  const bodyData = req.body;
  let resurltQuery;
  insertLoggingToList(bodyData).then((result) => {
    resurltQuery = result;
    return res.status(result.status).json(result.data);
  });
  res.on("finish", async () => {
    console.log("finish event running");
    await loadingAndAnalynsLogging(resurltQuery.keyAnalyst);
  });
}); // router.post("/redis/analynst", function (req, res) {
//   const bodyData = req.body;
//   insertLoggingToList(bodyData).then((result) => {
//     return res.status(result.status).json(result.data);
//   });
// });
module.exports = router;
