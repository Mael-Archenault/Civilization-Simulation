import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

import jwt from 'jsonwebtoken';


app.use(express.json());

let refreshTokens = []

const posts = [
    { username: 'Kyle', title: 'Post 1' },
    { username: 'Jim', title: 'Post 2' }
]


app.listen(4000, () => {
    console.log('Server is running on port 4000')
});