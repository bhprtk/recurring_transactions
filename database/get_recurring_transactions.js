const db = require('./db')

module.exports = () => {
    const collection = db.get().collection('test1')
    const results = collection.find().toArray((err, results) => results)
    return collection.find().toArray().then(data => data)
}