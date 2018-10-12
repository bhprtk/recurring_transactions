const axios = require('axios')
const xlsx = require('node-xlsx')

const xlsx_data = xlsx.parse('sample_transactions.xlsx')
const { data } = xlsx_data[0]
const fields = data[2]
const transactions_data = data.slice(3)
transactions = []
transactions_data.forEach(transaction => {
    let obj = {}
    for(let i = 0; i < 5; i ++) {
        obj[fields[i]] = transaction[i]
    }
    transactions.push(obj)
})

axios
    .post('http://localhost:1984/', transactions)
    .then(data => {
        console.log('data.data', data.data)
    })
    .catch(error => {
        console.log('error', error)
    })
