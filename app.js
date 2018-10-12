const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
const PORT = 1984

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    // for(let i )
    // console.log('hello world')
    res.send('hello from the other side')
})

app.post('/', (req, res) => {
    console.log('req.body', req.body)
    res.send(req.body)
})

app.listen(PORT)