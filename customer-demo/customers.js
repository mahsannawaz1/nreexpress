const mongoose = require('mongoose')
const Joi = require('joi')

mongoose.connect('mongodb://lcoalhost/CustomerDataBase')
.then(()=>console.log('Connected to MongoDB...'))
.catch((err)=>console.log(`Couldn't connect to MongoDB: ${err}`))