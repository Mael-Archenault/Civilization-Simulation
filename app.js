import express from 'express';
import jwt from 'jsonwebtoken';
import {getUser, getUsers, createUser, createMap, deleteMap, getMaps} from './database.js';
import pako from "pako"
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

let tokens = []


const app = express();
app.set('view engine', 'ejs');


app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.json())
app.use(authenticateToken)
app.use(express.static("public"))

app.get("/home", authenticateToken, loadMaps, (req, res) => {
    console.log("Initialization done")
    if (req.user==null) {
        res.render("index.ejs", {username: null, maps: null})
    }
    else{
        res.render("index.ejs", {username: req.user.username, maps: req.maps})
    }
})



app.get("/login",  (req, res) => {
    res.render("login.ejs", {error_message: null})
})

app.post("/login", async (req, res) => {
    const user = await getUser(req.body.username)
    if (user!=null && user.password==req.body.password) {

        const accessToken = generateAccessToken({username: user.username})
        tokens.push({
            id: user.id,
            username: user.username,
            accessToken :accessToken
        })
        res.cookie('accessToken', accessToken, {httpOnly: true})
        res.redirect("/home")

    } 
    else {
        res.render("login.ejs", {error_message: "Wrong username or password"})
    }
})

app.get("/signin", async (req, res) => {
    res.render("signin.ejs", {error_message: null})

})

app.post("/signin", async (req, res) => {
    const user = await getUser(req.body.username)
    if (!user) {
        await createUser(req.body.username, req.body.password)
        res.redirect("/home")
    }
    else {
        res.render("signin.ejs", {error_message: "Username already exists"})
    }
    })


function authenticateToken(req, res, next) {
    console.log("Authenticate token")
    const token = req.cookies.accessToken
    console.log(token)
    if(token == null) {
        req.user = null
        next()
    }
   
    else{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.sendStatus(403)
            
            req.user = tokens.filter(token => token.accessToken==req.cookies.accessToken)[0]
            next()
        }) 
    }
    
}

async function loadMaps(req, res, next) {
    if (req.user!=null) {
        const maps = await getMaps(req.user.id)
        console.log(maps)
        req.maps = maps
        next()
        }
    else {
        req.maps = null
        console.log("No user")
        next()
    }
}


app.post("/logout", (req, res) => {
    tokens = tokens.filter(token => token!=req.cookies.accessToken)
    res.clearCookie('accessToken')
    res.redirect("/home")
});

app.post("/map/save",authenticateToken, async (req, res) => {

    if (req.user==null) {
        res.redirect("/login")
    }
    else {
        let userId = req.user.id
        await createMap(req.body.keys, userId)
        res.redirect("/home")
    }
    
})

app.post("/map/delete",authenticateToken, async (req, res) => {

    if (req.user==null) {
        res.redirect("/login")
    }
    else {
        await deleteMap(req.body.mapId)
        console.log("Deleted")
        res.redirect("/home")
    }
    
})


app.post("/game/:code", authenticateToken, (req, res) => {
    const keys = decodeData(req.params.code)
    console.log(keys)
    res.render("game.ejs", {t_keys: keys})
})





function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
}



app.listen(8080, ()=>{
    console.log('Server is running on port 8080')
})






function encodeData(data){

    let jsonData = JSON.stringify(data)
    console.log(jsonData)
    let base64Data = btoa(jsonData)
    
    return base64Data

}

function decodeData(data){
    let jsonData = atob(data)
    let decodedData = JSON.parse(jsonData)
    return decodedData
}

let test = {
    "keys": [1,2,3,4,5],
    "values": [1,2,3,4,5]
}

