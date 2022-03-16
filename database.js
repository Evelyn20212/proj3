// pg-promise as a function required and invoked 
const pgp = require('pg-promise')() 

const username = 'postgres'
const password = '1234'
const host = 'localhost'
const port = 5432
const database = 'learning'

const connectString = `postgres :// ${username}:{password}@${host}:${port}/${database}`

const db =pgp(connectString)

module.exports =db