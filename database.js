import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


export async function getUsers(){
const [rows] = await pool.query("SELECT * FROM users")
    return rows
}

export async function getUser(username){
    const [row] = await pool.query("SELECT * FROM users WHERE username = ?", [username])
    return row[0]
}

export async function createUser(username, password){

    try {
        const [result] = await pool.query("INSERT INTO users (username, password) VALUES (?,?)", [username, password])
    }
    catch (err) {
        console.error(err)
    }
}




















// const express = require('express');
// const path = require('path');


// const app = express();

// app.use(express.static(path.join(__dirname,'public')));
// app.listen(3000, ()=> {
//     console.log('Server is running on port 3000');
// })



