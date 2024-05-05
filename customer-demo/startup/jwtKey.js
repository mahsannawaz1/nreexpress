const winston = require('winston')
function checkJWTSecretkey(){
    if(!process.env.JWT_SECRET_KEY){
        winston.error('FATAL ERROR: JWT Private key is not defined.')
        process.exit(1)
    }
}
module.exports = checkJWTSecretkey