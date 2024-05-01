var url = 'https://www.google.com'

const EventEmitter = require('events')


class Logger extends EventEmitter{
  
    log = (message)=>{
        console.log(message)
        this.emit('messageLogged',{x:1,y:2})
    }
}

module.exports = Logger; 