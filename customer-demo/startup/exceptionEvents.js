

function uncaughtExceptions(){
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
    
}

module.exports = uncaughtExceptions