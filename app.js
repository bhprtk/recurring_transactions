const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = 1984

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/upsert_transaction', (req, res) => {
    console.log('req.body', req.body)
    res.send(req.body)
})

app.listen(PORT)