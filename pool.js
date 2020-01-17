var mysql = require('mysql');
var util = require('util');

//setup database
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "127.0.01",
    user: "root",
    password: "",
    database: 'hamster_network'
});

pool.getConnection((err, connection) => {
    if(err) 
        console.error("Something went wrong connecting to the database ...");
    
    if(connection)
        connection.release();
    return;
});


pool.query = util.promisify(pool.query);



module.exports = pool