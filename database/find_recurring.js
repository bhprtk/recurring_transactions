const moment = require('moment')

const db = require('./db')

module.exports = transactions => {
    // Date when the API was called. 
    // Current date taken from the sample transaction file.
    const exported_on = moment('2018-08-10').format()

    // Declare a store for grouping transaction names
    let store = {}

    // Loop through each transaction to group transaction names
    transactions.forEach(transaction => {
        // Regex to get the transaction name without trailing numbers
        let name = transaction.name.replace(/\s+\d+/g, '')

        // Create a new key with the transaction name if it doesn't exist
        // Create a list of date and amount to compare their values for each transaction name
        if(!store[name]) {
            store[name] = {
                date: [transaction.date],
                amount: [transaction.amount],
                transactions: [transaction]
            }
        } else {
            // Add the transaction dates and amount to each transaction name in the store
            // Store a list of dates and amounts for each transaction name
            for(let key in transaction) {
                if(key === 'date' || key === 'amount') {
                    store[name][key].push(transaction[key])
                }
            }
            store[name].transactions.push(transaction)
        }
    })

    // Loop through each transaction name in the store
    // Create a list of differences in dates for each transaction 
    for(let key in store) {
        const { date, amount, transactions } = store[key]


        
        // Array to store the list of difference in days
        let days_arr = []

        // Loop through the list of dates to find differences between consecutive dates
        for(let i = date.length - 1; i > 0; i--) {
            // Get the difference between 2 dates in days for each transaction
            let date1 = Date.parse(date[i])
            let date2 = Date.parse(date[i - 1])
            let abs = Math.abs(date1 - date2)
            let days = Math.round(abs / (1000*60*60*24))
            // Add the differences in days to days_arr
            days_arr.push(days)
        }

        // Get the average, max and min values of the intervals in days for each transaction
        let avg = Math.round(days_arr.reduce((a, b) => a + b, 0) / days_arr.length)
        let max = Math.max(...days_arr)
        let min = Math.min(...days_arr)
        
        // Find the difference between today and the last date of the transaction
        // If there is a huge gap, then the transaction is not actively recurring
        let exported = Date.parse(exported_on)
        let recent = Date.parse(date[0])
        let abs = Math.abs(exported - recent)
        let diff = Math.round(abs / (1000*60*60*24))


        // Algorithm to identify recurring transactions
        // If the max and min difference in days is close to the average
        // or if the difference in days is similar multiples of the average
        // and the difference between today and the last transaction date is not as big as the max
        // then the transaction is recurring
        if(max % avg <= 5 && avg % min <= 5 && diff < max) {
            let re = new RegExp(key, 'g')
            const next_date = moment(date[0]).add(avg, 'days').format()
            let avg_amount = (amount.reduce((a, b) => a + b, 0) / amount.length).toFixed(2)

            let obj = {
                name: key,
                // user_id: transaction.user_id,
                next_amt: avg_amount,
                next_date,
                transactions
            }
            db.get().collection('recurring').insertOne(obj)
                .catch(err => console.log('err', err))

        } 
    }
}