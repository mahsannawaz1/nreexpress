const winston = require('winston')

function addTransports(){
    winston.add(new winston.transports.File({ 
        filename:'logfile.log'
    }))
    winston.add(new winston.transports.MongoDB({
        db:'mongodb://localhost/CustomerDataBase',
    }))    
}
module.exports = addTransports