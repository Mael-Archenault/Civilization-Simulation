import express from 'express';
import jwt from 'jsonwebtoken';
import {getUser, getUsers, createUser} from './database.js';

import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

let tokens = []


const app = express();
app.set('view engine', 'ejs');


app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
// app.use(authenticateToken)
app.use(express.static("public"))

app.get("/", authenticateToken, (req, res) => {
    if (req.user==null) {
        res.render("index.ejs", {username: null})
    }
    else{
        res.render("index.ejs", {username: req.user.name})
    }
})



app.get("/login",  (req, res) => {
    res.render("login.ejs", {error_message: null})
})

app.post("/login", async (req, res) => {
    const user = await getUser(req.body.username)
    if (user!=null && user.password==req.body.password) {

        const username = req.body.username;
        const user = { name: username };
        const accessToken = generateAccessToken(user)
        tokens.push(accessToken)
        res.cookie('accessToken', accessToken, {httpOnly: true})
        res.redirect("/")

    } 
    else {
        res.render("login.ejs", {error_message: "Wrong username or password"})
    }
})

app.get("/signin", (req, res) => {
    res.render("signin.ejs", {error_message: null})
})

app.post("/signin", async (req, res) => {
    const user = await getUser(req.body.username)
    if (!user) {
        await createUser(req.body.username, req.body.password)
        res.redirect("/")
    }
    else {
        res.render("signin.ejs", {error_message: "Username already exists"})
    }
    })


function authenticateToken(req, res, next) {
    const token = req.cookies.accessToken
    console.log("Token : ", token)
    if(token == null) {
        req.user = null
        console.log("Token is null")
        next()
    }
   
    else{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.sendStatus(403)
            req.user = user
            console.log("Token verified")
            next()
        }) 
    }
    
}




app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
});



app.post("/logout", (req, res) => {
    tokens = tokens.filter(token => token!=req.cookies.accessToken)
    res.clearCookie('accessToken')
    res.redirect("/")
});


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
}


app.listen(8080, ()=>{
    console.log('Server is running on port 8080')
})

const test = 1