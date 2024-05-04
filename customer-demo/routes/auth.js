const Joi = require('joi')
const router = require('express').Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')



router.post('/',async(req,res)=>{
    const { value,error } = validateUser(req.body)
    if(error){
        res.status(400).send( { errors: error.details } )
        return;
    }
    let user = await User.findOne({email:value.email})

    if(!user){
        res.status(400).send({error:`Invalid email or password.`})
        return;
    }
    const validPassword = await bcrypt.compare( value.password, user.password )
    if(!validPassword){
        res.status(400).send({error:`Invalid email or password.`})
        return;
    }
    
    // const token = jwt.sign({ _id:user._id },process.env.JWT_SECRET_KEY)
    const token = user.generateAuthToken()
    res.send({ token })
    
})

const validateUser = (data)=>{
    const schema = Joi.object({
        email:Joi.string().min(5).max(255).email().required(),
        password:Joi.string().min(6).max(255).required()
    })
    return schema.validate(data)
}




module.exports = router