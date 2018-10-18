const express = require('express')
const bodyParser = require('body-parser')
const db = require('./database/db')

// modules
const upsert_database = require('./database/upsert_database')
const get_recurring_transactions = require('./database/get_recurring_transactions')

const app = express()
const PORT = 1984

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    // for(let i )
    // console.log('hello world')
    get_recurring_transactions()
        .then(results => {
            res.send(results)
        })
    
})

app.post('/', (req, res) => {
    upsert_database(req.body)
    res.send(req.body)
})

// Connect to Mongo on start
db.connect('mongodb://localhost:27017', err => {
    if(err) {
        console.log("Unable to connect to Mongo.")
    } else {
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        })
    }
})
