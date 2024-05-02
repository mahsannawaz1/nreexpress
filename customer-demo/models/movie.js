const mongoose = require('mongoose')
const { genreSchema } = require('./genre')

const movieSchema  = new mongoose.Schema(
    {
        title:{
            type:String,
            require:true,
            minlength:5,
            maxlength:255,
            trim:true,
            lowercase:true
        },
        genre: { 
            type:genreSchema,
            require:true
        },
        numberInStock:{
            type:Number,
            required:true,
            min:0,
            max:100
        },
        dailyRentalRate:{
            type:Number,
            required:true,
            min:0,
            max:100,
            default:0,
            get: (value) => value.toFixed(2),
            set: (value) => value.toFixed(2)
            
        }
    }
)

module.exports = mongoose.model('Movie',movieSchema)