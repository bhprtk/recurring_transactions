const db = require('./db')

// Insert all given transactions into <transactions> collection
module.exports = (transactions, done) => {
    transactions.forEach(transaction => {
        // Check if the transaction already exist in the <transactions> collection
        db.get().collection('transactions').findOne({ trans_id: transaction.trans_id })
            .then(result => {
                // Insert transaction if the document does not exist
                if(!result) {
                    db.get().collection('transactions').insertOne(transaction)
                        .catch(err => done(err))
                } else {
                    console.log('The transaction already exists!')
                }
            })
            .catch(err => done(err)) 
    })
    done()
}