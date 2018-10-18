const db = require('./db')

module.exports = done => {
    // Query the recurring collections
    db.get().collection('recurring').find().sort({ 'name': 1 }).toArray((err, transactions) => {
        if(err) {
            done(err)
        } else {
            done('', transactions)
        }
    })
}