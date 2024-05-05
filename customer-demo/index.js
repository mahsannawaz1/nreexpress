require('dotenv').config()
require('express-async-errors')

const winston  = require('winston')
require('winston-mongodb')
const morgan = require('morgan')
const helmet = require('helmet')
const express = require('express')

const routes = require('./startup/routes')
const connectToDatabase = require('./startup/db')
const app = express()

winston.add(new winston.transports.File({ 
    filename:'logfile.log'
}))
winston.add(new winston.transports.MongoDB({
    db:'mongodb://localhost/CustomerDataBase',
}))


process.on('uncaughtException',(exception)=>{
    // console.log('WE GOT AN UNCAUGHT EXCEPTION')
    winston.error(exception.message,exception)
    // process.exit(1)
})
process.on('unhandledRejection',(exception)=>{
    // console.log('WE GOT AN UNHANDLED EXCEPTION')
    winston.error(exception.message,exception)
    // process.exit(1)
})

// throw new Error('Error before starting app')
// const p = Promise.reject(new Error('Something failed miserably'))
// p.then(()=>console.log('Done'))

if(!process.env.JWT_SECRET_KEY){
    console.error('FATAL ERROR: JWT Private key is not defined.')
    process.exit(1)
}

connectToDatabase()

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(helmet())
if(process.env.NODE_ENV=='development'){
    app.use(morgan('dev'))
}

routes(app)

const port = process.env.PORT | 3000
app.listen(port,()=>console.log(`Listening at Port: ${port}`))