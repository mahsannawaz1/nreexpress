const winston = require("winston");

function error(error,req,res,next){
    // Log the exception
    // winston.log('error',error.message,error) --> (levelofLog,msg,metaData)
    winston.error(error.message,error)
    res.status(500).send({error:'Something failed'})
    return;
}
module.exports = error