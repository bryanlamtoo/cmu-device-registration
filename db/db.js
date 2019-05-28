const mongoose = require('mongoose')

require('../config/config.js')

// Wait for the in memory db
let waitingTime = 0
if (process.env.NODE_ENV === 'test') waitingTime = 5000

setTimeout(function () {
  let connectionString = global.gConfig.database
  console.log(connectionString)

  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true
  }, (err) => {
    if (!err) {
      console.log('Database connected successfully')
    } else {
      console.log('Error in database connection: ' + err)
    }
  })
}, waitingTime)

module.exports = {
  db: mongoose
}
