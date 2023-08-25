const mysql = require("mysql2/promise");

// conection pararmeters
const dbConfig = {
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  socketPath: process.env.DB_SOCKET_PATH,
};
// create connection pool
const pool = mysql.createPool(dbConfig);

// prepare a function that will exceute the sql queries asynchronously....

// rows: This variable holds the value of the first element of the array returned by pool.execute, which typically represents the result rows of the executed query.
// fields: This variable holds the value of the second element of the array returned by pool.execute, which may represent information about the fields (columns) returned by the query, such as their names and types.

// used to excute  the queries when we pass it the sql and parameters asynchronously..so it just means instead of writing poo.query for every queries..we are just using general formula which we can use it everywere..thts why we are exporting it..
async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);
  return rows;
}

// export the query function for use in the application
module.exports = { query };
