const { required } = require('joi')
const mongoose = require('mongoose')

const userSchema  = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true,
            minlength:5,
            maxlength:255,
            trim:true,
            lowercase:true
        },
        email: {
            type:String,
            unique:true,
            required:true,
            maxlength:255
        },
        password:{
            type:String,
            minlength:6,
            maxlength:1024,
            required:true
        }
        
    }
)
module.exports = mongoose.model('User',userSchema)