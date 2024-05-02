const mongoose = require('mongoose')
const Joi = require('joi')
const router = require('express').Router()
const Course = require('./models/customer')

mongoose.connect('mongodb://localhost/CustomerDataBase')
.then(()=>console.log('Connected to MongoDB...'))
.catch((err)=>console.log(`Couldn't connect to MongoDB: ${err}`))

router.get('/',async (req,res)=>{
    res.send( await Course.find() )
})

router.get('/:id',async (req,res)=>{

    const course = await Course.findById(req.params.id)
    console.log(course)
    if(!course){
        res.status(404).send( { error:`Customer Not Found` } )
        return;
    }
    res.send(course)
})

router.post('/',async (req,res)=>{
    const { value: customer, error } = validateCustomer(req.body)
    if(error){
        res.status(400).send( { errors: error.details } )
        return;
    }
        

    const course = new Course( { ...customer } )
    res.send(await course.save() )
    
    
})

router.put('/:id',async (req,res)=>{
    const { value: customer, error } = validateCustomer(req.body)
    if(error){
        res.status(400).send( { errors: error.details } )
        return;
    }
    const course = await Course.findByIdAndUpdate(req.params.id,{ ...customer },{ new:true })
    if(!course){
        res.status(404).send( { error:`Customer Not Found` } )
        return;
    }
    res.send(course)
    
})

router.delete('/:id',async(req,res)=>{
    
    const course = await Course.findByIdAndDelete(req.params.id)
    if(!course){
        res.status(404).send( { error:`Customer Not Found` } )
        return;
    }
    res.send(course)
})

const validateCustomer = (data)=>{
    const schema = Joi.object(
        {
            name:Joi.string().min(5).max(255),
            phone:Joi.string().regex(/^\+92-[0-9]{10}$/).min(11).max(14),
            isGold:Joi.boolean()
    })
    return schema.validate(data)
}

module.exports = router