const mongoose = require('mongoose')

const genreSchema  = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true,
            minlength:5,
            maxlength:50,
            trim:true,
            lowercase:true
        },
        
    }
)
module.exports.genreSchema = genreSchema
module.exports.Genre = mongoose.model('Genre',genreSchema)