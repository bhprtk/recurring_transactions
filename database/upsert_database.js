const db = require('./db')

module.exports = transactions => {
    // console.log('transactions', transactions)

    let recurring = [], non_recurring = []
    test_transactions = [
        { 
            name: 'Verizon Wireless',
            date: '2016-10-05T07:00:00.000Z',
            amount: 141.74,
            trans_id: 101,
            user_id: 1 
        },
        { 
            name: 'Verizon Wireless',
            date: '2016-09-02T07:00:00.000Z',
            amount: 141.74,
            trans_id: 102,
            user_id: 1 
        },
        { name: 'Netflix',
            date: '2016-08-12T07:00:00.000Z',
            amount: 9.95,
            trans_id: 103,
            user_id: 1 
        },
        { 
            name: 'VPN Service',
            date: '2016-05-19T07:00:00.000Z',
            amount: 29.99,
            trans_id: 17,
            user_id: 1 
        }]

    // Store the date and amount with the same name. Let's call it store

    let store = {}
    transactions.forEach(transaction => {
        let name = transaction.name.replace(/\s+\d+/g, '')
        console.log('name', name)
    })
    
    
    // assuming its already recurring
    // transactions.forEach(transaction => {
    //     if(!recurring[transaction.name]) {
    //         recurring[transaction.name] = {
    //             date: [transaction.date],
    //             amount: [transaction.amount],
    //         }
    //     } else {
    //         for(let key in transaction) {
    //             if(key === 'date' || key === 'amount') {
    //                 recurring[transaction.name][key].push(transaction[key])
    //             }
    //         }
    //     }
    // })

    
    
    // const collection = db.get().collection('test1')
    // collection.insertMany(test_transactions, (err, results) => {
    //     console.log('results', results)
    // })

    // collection.find({}).toArray((err, docs) => {
    //     console.log(docs)
    // })
    // db.get().createCollection('test')
    //     .then(result => {
    //         console.log('result', result.exists())
    //     })
    // console.log(collection)
}
