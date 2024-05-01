const config = require('config')
const morgan = require('morgan')
const helmet = require('helmet')
const Joi = require('joi')
const express = require('express')
const _ = require('underscore')
const logger = require('./middlewares/logger')
const authentication = require('./middlewares/authentication')
const courses = require('./routes/courses')
const home  =require('./routes/home')
const app = express()


console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`app: ${app.get('env')}`)
// app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger)
app.use(authentication)
app.use(express.static('public'))
app.use(helmet())

console.log(config.get('name'))
console.log(config.get('mail.password'))

if(app.get('env')=='development'){
    console.log('Morgan enabled')
    app.use(morgan('tiny'))
}
app.use('/api/courses',courses)
app.use('/',home)


const port = process.env.PORT || 3000
app.listen(port,()=>console.log('Listening at port ',port))
