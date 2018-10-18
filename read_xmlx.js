const axios = require('axios')
const xlsx = require('node-xlsx')

// Parse the sample transaction file
const xlsx_data = xlsx.parse('sample_transactions.xlsx')
const { data } = xlsx_data[0]
// All fields in the transaction
const fields = data[2]
// All transactions
const transactions_data = data.slice(3)
transactions = []
transactions_data.forEach(transaction => {
    let obj = {}
    for(let i = 0; i < 5; i ++) {
        obj[fields[i]] = transaction[i]
    }
    transactions.push(obj)
})

// Sample POST API call with a list of transactions
axios
    .post('http://localhost:1984/', transactions)
    .then(data => {
        console.log('data.data', data.data)
    })
    .catch(error => {
        console.log('error', error)
    })
