const postgres = require("postgres");
const databaseConfig = postgres(process.env.CONNECTIONSTING_DATABASE_URL);
const getAllLogWithDateandStatusQuery = async () => {
  try {
    const resultQuery = await databaseConfig`SELECT * from log_infor`;
    return { data: resultQuery, status: 200 };
  } catch (e) {
    return { data: e, status: 500 };
  }
};

const postLogToTableQuery = async (dataQuery) => {
  const data = dataQuery;
  try {
    const resultQuery =
      await databaseConfig`INSERT INTO public.log_infor ${databaseConfig(
        data,
        "service_host",
        "service_name",
        "method",
        "path",
        "status",
        "duration",
        "user_agent",
        "user_ip"
      )}`;
    return {
      status: 200,
      message: "Insert log success",
      data: resultQuery,
    };
  } catch (e) {
    console.log(e);
    return { data: e, status: 500 };
  }
};

module.exports = {
  getAllLogWithDateandStatusQuery,
  postLogToTableQuery,
};
