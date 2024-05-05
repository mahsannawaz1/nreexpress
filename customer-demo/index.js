require('dotenv').config()
require('express-async-errors')
require('winston-mongodb')
const morgan = require('morgan')
const helmet = require('helmet')
const express = require('express')

const addTransports = require('./startup/winston')
const checkJWTSecretkey = require('./startup/jwtKey')
const routes = require('./startup/routes')
const connectToDatabase = require('./startup/db')
const uncaughtExceptions = require('./startup/exceptionEvents')

const app = express()
addTransports()
uncaughtExceptions()

// throw new Error('Error before starting app')
// const p = Promise.reject(new Error('Something failed miserably'))
// p.then(()=>console.log('Done'))

checkJWTSecretkey()
connectToDatabase()

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(helmet())
app.use(morgan('dev'))
routes(app)

const port = process.env.PORT | 3000
app.listen(port,()=>console.log(`Listening at Port: ${port}`))