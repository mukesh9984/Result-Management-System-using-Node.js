const mysql = require("mysql2");
const con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'root',
    database: "NodeJSAssignment",
    port: 3306
});

con.connect((err)=>{
    if(err) throw err;
    console.log("Connection Created..!!");
});

module.exports.con=con;
