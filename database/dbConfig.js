const createError = require('http-errors');
const mysql = require('mysql');
require('dotenv').config();



// create connection
const db = mysql.createConnection({
    
    host: process.env.HOST,
    user:  process.env.USER,
    password:  process.env.PASSWORD,
    database:  process.env.DATABASE
    
})


//connect to MySql
db.connect(err => {
    if(err){
        throw createError(500, "Internal server error");
    }
    console.log('MYSQL Connected')
})

 module.exports = db;


 