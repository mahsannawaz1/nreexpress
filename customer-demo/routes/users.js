const Joi = require('joi')
const router = require('express').Router()
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const auth = require('../middlewares/auth')
const User = require('../models/user')



router.get('/',auth,async(req,res)=>{
    res.send(await User.find())
})
router.get('/:id',auth,async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(404).send( { error:`User Not Found` } )
        return;
    }
    res.send(user)
})
router.post('/',async(req,res)=>{
    const { value,error } = validateUser(req.body)
    if(error){
        res.status(400).send( { errors: error.details } )
        return;
    }
    let user = await User.findOne({email:value.email})
    if(user){
        res.status(400).send({error:'User already registered'})
    }

    user = new User(_.pick(req.body,['name','email','password']))

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password,salt)
    user.password = hashedPassword
    
    user = await user.save()
    // res.send({
    //     name:user.name,
    //     email:user.email
    // })
    // const token = jwt.sign({ _id:user._id },process.env.JWT_SECRET_KEY)
    const token = user.generateAuthToken()
    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']))
    
})

const validateUser = (data)=>{
    const schema = Joi.object({
        name:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(255).email().required(),
        password:Joi.string().min(6).max(255).required()
    })
    return schema.validate(data)
}


module.exports = router