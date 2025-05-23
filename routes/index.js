var express = require("express");
const { getAllLogWithDateandStatusQuery } = require("../tableConfig/log/log");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  getAllLogWithDateandStatusQuery().then((result) => {
    res.status(result.status).json(result.data);
  });
});

module.exports = router;
