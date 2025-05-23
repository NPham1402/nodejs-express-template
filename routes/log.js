var express = require("express");
const {
  getAllLogWithDateandStatusQuery,
  postLogToTableQuery,
} = require("../tableConfig/log/log");
var router = express.Router();

router.get("/", function (req, res) {
  getAllLogWithDateandStatusQuery().then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.post("/", function (req, res) {
  const bodyData = req.body;
  postLogToTableQuery(bodyData).then((result) => {
    res.status(result.status).json(result.data);
  });
});
module.exports = router;
