const moment = require('moment')

const db = require('./db')

module.exports = transactions => {
    const exported_on = moment('8/10/2018').format()
    console.log('exported on', exported_on)

    // Store the date and amount with the same name. Let's call it store

    let store = {}
    transactions.forEach(transaction => {
        let name = transaction.name.replace(/\s+\d+/g, '')
        if(!store[name]) {
            store[name] = {
                date: [transaction.date],
                amount: [transaction.amount]
            }
        } else {
            for(let key in transaction) {
                if(key === 'date' || key === 'amount') {
                    store[name][key].push(transaction[key])
                }
            }
        }
    })

    // console.log('store', store)

    for(let key in store) {
        const { date, amount } = store[key]
        console.log('----------------------------------')
        console.log('key', key)
        let days_arr = []
        for(let i = date.length - 1; i > 0; i--) {
            let date1 = Date.parse(date[i])
            let date2 = Date.parse(date[i - 1])
            let abs = Math.abs(date1 - date2)
            let days = Math.round(abs / (1000*60*60*24))
            days_arr.push(days)
        }
        console.log('days_arr', days_arr)
        let avg = Math.round(days_arr.reduce((a, b) => a + b, 0) / days_arr.length)
        let max = Math.max(...days_arr)
        let min = Math.min(...days_arr)
        console.log('avg', avg)
        console.log('max', max)
        console.log('min', min)
        console.log('date', date)

        
        let exported = Date.parse(exported_on)
        let last = Date.parse(date[0])
        let abs = Math.abs(exported - last)
        let diff = Math.round(abs / (1000*60*60*24))

        console.log("diff", diff)

        if(max % avg <= 5 && avg % min <= 5 && diff < max) {
            console.log('recurring')
        } else {
            console.log('not recurring')
        }
    }


    
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
