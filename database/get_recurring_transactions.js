const db = require('./db')

module.exports = done => {
    // Query the recurring collections
    db.get().collection('recurring').find().toArray((err, transactions) => {
        if(err) {
            done(err)
        } else {
            done('', transactions)
        }
    })
}