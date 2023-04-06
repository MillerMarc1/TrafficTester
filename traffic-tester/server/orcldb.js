const oracledb = require('oracledb');
//oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function handleRequest(req) {
    let connection;
    try {
        connection = await oracledb.getConnection(
            {
                user: "marcmiller", 
                password: "8cYUozvA4mNxc0rQ5xLFjbaM",
                connectionString: "orcl"
            }
        );
        //console.log("Successfully connected to Oracle Database");
       
        const result = await connection.execute(
            req,
            []
        );

        return result.rows;
    } catch(err) {
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
}

module.exports = { req }
