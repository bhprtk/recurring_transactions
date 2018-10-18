const db = require('./db')

const insert_all_transactions = require('./insert_all_transactions')
const find_recurring = require('./find_recurring')

module.exports = transactions => {
    // Insert all given transactions into <transactions> collection
    insert_all_transactions(transactions, err => {
        if(err) {
            console.log('err', err) 
            return
        } 

        // Get all the database transactions after the write is finished.
        // Call a function to determine all the recurring transactions
        db.get().collection('transactions').find().toArray((err, result) => {
            if(err) console.log('err', err)
            find_recurring(transactions)
        })
            
    })
}
    
