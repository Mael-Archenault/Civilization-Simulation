import express from 'express';
import { getAccount, getAccounts} from './database.js';

const app = express();

app.use(express.static("public"))

app.get("/accounts", async (req, res) => {
    const accounts = await getAccounts()
    res.send(accounts)
})



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong')
})


app.listen(8080, ()=>{
    console.log('Server is running on port 8080')
})

const test = 1