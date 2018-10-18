const db = require('./db')
const insert_all_transactions = require('./insert_all_transactions')
const find_recurring = require('./find_recurring')

module.exports = (transactions, done) => {

    db.get().collection('transactions').find().toArray((err, data) => {
        if(err) done(err)
        // Global transactions combining the new and transactions from the database
        // Use to find recurring transactions from all existing transactions
        let g_transactions = data.concat(transactions)

        // Insert all given transactions into <transactions> collection
        insert_all_transactions(transactions, err => {
            if(err) {
                done(err, '') 
                return
            } 

            // Call a function to determine all the recurring transactions
            find_recurring(g_transactions)
        })
    }) 
    done()
}
    
