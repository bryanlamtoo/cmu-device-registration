const _ = require('lodash')

// module variables
const config = require('./config.json')

// Test configuration
const defaultConfig = config.development
const environment = process.env.NODE_ENV || 'development'
const environmentConfig = config[environment]

// const InMemoryDB = require('mongodb-memory-server').MongoMemoryServer
// const mongod = new InMemoryDB()
// async function spinADb () {
//   const uri = await mongod.getConnectionString()
//   const port = await mongod.getPort()
//   const dbPath = await mongod.getDbPath()
//   const name = await mongod.getDbName()
//   return {
//     location: uri,
//     port,
//     dbPath,
//     dbName: name
//   }
// }
// // Create an in memory db
// if (process.env.NODE_ENV === 'test') {
//   spinADb().then(
//     db => {
//       environmentConfig.database = db.location
//       const finalConfig = _.merge(defaultConfig, environmentConfig)
//       global.gConfig = finalConfig
//     })
// }

const finalConfig = _.merge(defaultConfig, environmentConfig)

// as a best practice
// all global variables should be referenced via global. syntax
// and their names should always begin with g
global.gConfig = finalConfig
