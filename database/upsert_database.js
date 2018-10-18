const db = require('./db')

const insert_all_transactions = require('./insert_all_transactions')
const find_recurring = require('./find_recurring')

module.exports = (transactions, done) => {
    // Insert all given transactions into <transactions> collection
    insert_all_transactions(transactions, err => {
        if(err) {
            done(err, '') 
            return
        } 
        // Call a function to determine all the recurring transactions
        find_recurring(transactions)
    })
    done()
}
    
