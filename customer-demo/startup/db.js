const mongoose = require('mongoose')
const winston = require('winston')

winston.add(new winston.transports.Console())
function connectToDatabase(){
    mongoose.connect('mongodb://localhost/CustomerDataBase')
    .then(()=> winston.info('Connected to MongoDB'))
    .catch((err)=>winston.error(`Couldn't connect to MongoDB`,err))
}
module.exports = connectToDatabase