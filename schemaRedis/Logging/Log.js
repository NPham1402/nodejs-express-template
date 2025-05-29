const dayjs = require("dayjs");
const redisClientConfig = require("../redisConfig");
const { json } = require("express");

const insertLoggingToList = async (logDataInsert) => {
  const client = redisClientConfig();
  client.connect();
  const keyPerDay =
    "Raw_Logs:T" +
    dayjs().format("MM/YYYY") +
    ":" +
    dayjs().format("DD/MM/YYYY");
  const insertData = { ...logDataInsert, statusScan: "0" };
  console.log(typeof JSON.stringify(insertData));
  try {
    const newLogId = await client.incr(dayjs().format("DD/MM/YYYY"));
    const newKeyId = keyPerDay + ":" + newLogId;
    // if (!client.exists(keyPerDay)) {
    //   await client.rPush("Analynst:wattingListAnalynst", {
    //     loadngKey: keyPerDay,
    //   });
    // }

    await client.hSet(newKeyId, insertData);
    return {
      data: { message: "Insert success log" },
      status: 200,
      keyAnalyst: newKeyId,
    };
  } catch (error) {
    console.log(error);
    return { data: { message: "Insert fail log" }, status: 500 };
  } finally {
    if (client && typeof client.quit === "function") {
      console.log("client close");
      await client.quit();
    }
  }
};

const loadingAndAnalynsLogging = async (keyAnalyst) => {
  const client = redisClientConfig();
  try {
    await client.connect();
    const dataAnalynst = await client.hGetAll(keyAnalyst);
    await client
      .multi()
      .zIncrBy(
        "Daily_Analyst:" +
          dataAnalynst.service_host +
          ":" +
          dataAnalynst.service_name +
          ":" +
          dataAnalynst.path +
          ":" +
          dataAnalynst.method,
        1,
        dataAnalynst.status
      )
      .zIncrBy("Daily_Analyst:User_ip:", 1, dataAnalynst.user_ip)
      .zIncrBy("User_Agents", 1, dataAnalynst.user_agent)
      .exec();
  } catch (error) {
    return console.error(error);
  } finally {
    if (client && typeof client.quit === "function") {
      console.log("client close");
      await client.quit();
    }
  }
};

module.exports = { insertLoggingToList, loadingAndAnalynsLogging };
