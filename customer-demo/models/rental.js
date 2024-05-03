const mongoose = require('mongoose')

const rentalSchema  = new mongoose.Schema(
    {
        customer: {
            type: new mongoose.Schema(
                {
                    name:{
                        type:String,
                        require:true,
                        minlength:5,
                        maxlength:255,
                        trim:true,
                        lowercase:true
                    },
                    phone:{
                        type:String,
                        required:true,
                        minlength:11,
                        maxLength:14,
                        format: /^\+92-[0-9]{10}$/ , // OR -- /^[0-9]{4}-[0-9]{7}$/
                        trim:true
                    },
                    isGold:{
                        type:Boolean,
                        required:true
                    }
                    
                    
                }
            ),
            required:true
        },
        genre: {
            type: new mongoose.Schema(
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
            ),
            required:true
        },
        movie: {
            type: new mongoose.Schema(
                {
                    title:{
                        type:String,
                        require:true,
                        minlength:5,
                        maxlength:255,
                        trim:true,
                        lowercase:true
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
            ),
            required:true
            
        },
        dateOut: {
            type:Date,
            required: true,
            default:Date.now
        },
        returnDate: {
            type:Date
        },
        rentalFee:{
            type:Number,
            min:0
        }
    }
)

module.exports = mongoose.model('Rental',rentalSchema)