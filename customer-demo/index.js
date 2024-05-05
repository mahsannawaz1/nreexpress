require('dotenv').config()
require('express-async-errors')


const customers = require('./routes/customers')
const genres = require('./routes/genres')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const auth = require('./routes/auth')

const winston  = require('winston')
const error = require('./middlewares/error')
const morgan = require('morgan')
const mongoose = require('mongoose')
const helmet = require('helmet')
const express = require('express')



const app = express()

winston.add(new winston.transports.File({ filename:'logfile.log' }))

if(!process.env.JWT_SECRET_KEY){
    console.error('FATAL ERROR: JWT Private key is not defined.')
    process.exit(1)
}

mongoose.connect('mongodb://localhost/CustomerDataBase')
.then(()=>console.log('Connected to MongoDB...'))
.catch((err)=>console.log(`Couldn't connect to MongoDB: ${err}`))


app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(helmet())
if(process.env.NODE_ENV=='development'){
    app.use(morgan('dev'))
}


app.use('/api/customers',customers)
app.use('/api/genres',genres)
app.use('/api/movies',movies)
app.use('/api/rentals',rentals)
app.use('/api/users',users)
app.use('/api/auth',auth)
app.use(error)

const port = process.env.PORT | 3000
app.listen(port,()=>console.log(`Listening at Port: ${port}`))