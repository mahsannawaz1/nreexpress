const mongoose = require('mongoose')

const customerSchema  = new mongoose.Schema(
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
)

module.exports = mongoose.model('Customer',customerSchema)