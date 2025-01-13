import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


export async function getAccounts(){
const [rows] = await pool.query("SELECT * FROM accounts")
    return rows
}

export async function getAccount(id){
    const [row] = await pool.query("SELECT * FROM accounts WHERE id = ?", [id])
    return row[0]
}

export async function createAccount(name, age){

    try {
        const [result] = await pool.query("INSERT INTO accounts (name, age) VALUES (?,?)", [name, age])
        const id = result.insertId
        console.log("Account created", id)
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



