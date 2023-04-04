const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function run() {
    let connection;
    try {
        connection = await oracledb.getConnection(
            {
                user: "marcmiller", 
                password: "8cYUozvA4mNxc0rQ5xLFjbaM",
                connectionString: "orcl"
            }
        );
        console.log("Successfully connected to Oracle Database");
       
        const result = await connection.execute(
            `SELECT * FROM TESTTABLE`,
            []
        );
        console.log(result.rows);
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
run();