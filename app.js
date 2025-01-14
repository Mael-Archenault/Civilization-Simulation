import express from 'express';
import {getUser, getUsers, createUser} from './database.js';


const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))


app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("index.html")
})

app.get("/login", (req, res) => {
    res.render("login.ejs", {error_message: null})
})

app.post("/login", async (req, res) => {
    console.log(req.body)
    const user = await getUser(req.body.username)
    if (user!=null && user.password==req.body.password) {
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

// app.post("/login_request", (req, res) => {)

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong')
// })



app.listen(8080, ()=>{
    console.log('Server is running on port 8080')
})

const test = 1