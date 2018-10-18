const MongoClient = require('mongodb').MongoClient
const dbName = 'clerkie'

let state = {
    db: null
}

exports.connect = (url, done) => {
    const client = new MongoClient(url, { useNewUrlParser: true })
    client.connect(err => {
        if (err) done(err)

        const db = client.db(dbName)
        state.db = db
    })
    done()
}

exports.get = () => state.db

exports.close = done => {
    if(state.db) {
        state.db.close((err, result) => {
            state.db = null
            done(err)
        })
    }
} 