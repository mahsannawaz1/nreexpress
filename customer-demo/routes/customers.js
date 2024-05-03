const Joi = require('joi')
const router = require('express').Router()
const Customer = require('../models/customer')



router.get('/',async (req,res)=>{
    res.send( await Customer.find() )
})

router.get('/:id',async (req,res)=>{

    const customer = await Customer.findById(req.params.id)
    if(!customer){
        res.status(404).send( { error:`Customer Not Found` } )
        return;
    }
    res.send(customer)
})

router.post('/',async (req,res)=>{
    const { value, error } = validateCustomer(req.body)
    if(error){
        res.status(400).send( { errors: error.details } )
        return;
    }
        

    const course = new Customer( { ...value } )
    res.send(await course.save() )
    
    
})

router.put('/:id',async (req,res)=>{
    const { value, error } = validateCustomer(req.body)
    if(error){
        res.status(400).send( { errors: error.details } )
        return;
    }
    const customer = await Customer.findByIdAndUpdate(req.params.id,{ ...value },{ new:true })
    if(!customer){
        res.status(404).send( { error:`Customer Not Found` } )
        return;
    }
    res.send(customer)
    
})

router.delete('/:id',async(req,res)=>{
    
    const customer = await Customer.findByIdAndDelete(req.params.id)
    if(!customer){
        res.status(404).send( { error:`Customer Not Found` } )
        return;
    }
    res.send(customer)
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