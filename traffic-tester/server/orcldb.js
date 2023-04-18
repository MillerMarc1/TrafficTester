const oracledb = require("oracledb");
const dotenv = require("dotenv");
dotenv.config();
//oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;
const userVar = process.env.REACT_APP_USER;
const passwordVar = process.env.REACT_APP_PASSWORD;
const connString = process.env.REACT_APP_CONN_STRING;

async function handleRequest(req) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: userVar,
      password: passwordVar,
      connectionString: connString,
    });
    //console.log("Successfully connected to Oracle Database");

    const result = await connection.execute(req, []);

    return result.rows;
  } catch (err) {
    console.log(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.log(err);
      }
    }
  }
}

const req = async function (query) {
  const result = await handleRequest(query);
  return result;
};

module.exports = { req };
