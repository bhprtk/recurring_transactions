const moment = require('moment')

const db = require('./db')

const insert_all_transactions = transactions => {
    const collection = db.get().collection('transactions')
    transactions.forEach(transaction => {
        // Check if the transaction already exist in the collection
        collection.findOne({ trans_id: transaction.trans_id })
            .then(result => {
                // Insert transaction if the document does not exist
                if(!result) {
                    collection.insertOne(transaction)
                        .then()
                        .catch(err => console.log('err', err))
                } else {
                    console.log('The transaction already exists!')
                }
            })
            .catch(err => console.log('err', err)) 
    })

    // return collection.insertMany(transactions, (err, results) => err ? err : '')
}

module.exports = transactions => {
    // Insert all given transactions into <transactions> collection
    insert_all_transactions(transactions)
        // .then(res => console.log('res', res))


    
    // const collection = db.get().collection('test1')
    // // Date when the API was called. 
    // // Current date taken from the sample transaction file.
    // const exported_on = moment('2018-08-10').format()

  
    // // let store = {}
    // // Go through each added transaction:
    // transactions.forEach(transaction => {
    //     // Get the transaction name withtout the trailing number:
    //     const name = transaction.name.replace(/\s+\d+/g, '')
    //     collection.find({ name }).toArray((err, db_trans) => {
    //         if(db_trans.length) {
    //             console.log('----------------------------------')
    //             console.log('name', name)
    //         } else {
    //             console.log('insert')
    //         }
    //     })
    // })
        

    //     // if(!store[name]) {
    //     //     store[name] = {
    //     //         date: [transaction.date],
    //     //         amount: [transaction.amount]
    //     //     }
    //     // } else {
    //     //     for(let key in transaction) {
    //     //         if(key === 'date' || key === 'amount') {
    //     //             store[name][key].push(transaction[key])
    //     //         }
    //     //     }
    //     // }
    // })

    // // console.log('store', store)

    // for(let key in store) {
    //     const { date, amount } = store[key]
    //     console.log('----------------------------------')
    //     console.log('key', key)
    //     let days_arr = []
    //     for(let i = date.length - 1; i > 0; i--) {
    //         let date1 = Date.parse(date[i])
    //         let date2 = Date.parse(date[i - 1])
    //         let abs = Math.abs(date1 - date2)
    //         let days = Math.round(abs / (1000*60*60*24))
    //         days_arr.push(days)
    //     }
    //     console.log('days_arr', days_arr)
    //     let avg = Math.round(days_arr.reduce((a, b) => a + b, 0) / days_arr.length)
    //     let max = Math.max(...days_arr)
    //     let min = Math.min(...days_arr)
    //     console.log('avg', avg)
    //     console.log('max', max)
    //     console.log('min', min)
    //     console.log('date', date)

        
    //     let exported = Date.parse(exported_on)
    //     let last = Date.parse(date[0])
    //     let abs = Math.abs(exported - last)
    //     let diff = Math.round(abs / (1000*60*60*24))

    //     console.log("diff", diff)

    //     if(max % avg <= 5 && avg % min <= 5 && diff < max) {
    //         console.log('recurring')
    //     } else {
    //         console.log('not recurring')
    //     }
    // }
    
}
