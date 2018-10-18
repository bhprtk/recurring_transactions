const express = require('express')
const bodyParser = require('body-parser')
const timeout = require('connect-timeout')

// Internal Modules
const db = require('./database/db')
const upsert_database = require('./database/upsert_database')
const get_recurring_transactions = require('./database/get_recurring_transactions')

// Big Brother PORT
const PORT = 1984
const app = express()

// Timeout duration
app.use(timeout('10s'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(haltOnTimedout)

app.get('/', (req, res) => {
    get_recurring_transactions((err, transactions) => {
        res.send(err ? err : transactions)
    })
})

app.post('/', (req, res) => {
    upsert_database(req.body, (err, transactions) => {
        if(err) res.send(err)
        get_recurring_transactions((err, transactions) => {
            res.send(err ? err : transactions)
        })
    })
})

// Function to send timeout response
function haltOnTimedout(req, res, next) {
    if (!req.timedout) next()
  }

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
