const mongoose = require('mongoose')
const Joi = require('joi')
const router = require('express').Router()
const { Genre } = require('../models/genre')

mongoose.connect('mongodb://localhost/CustomerDataBase')
.then(()=>console.log('Connected to MongoDB...'))
.catch((err)=>console.log(`Couldn't connect to MongoDB: ${err}`))

router.get('/',async(req,res)=>{
    res.send(await Genre.find())
    
})
router.get('/:id',async(req,res)=>{
    const genre = await Genre.findById(req.params.id)
    if(!genre){
        res.status(404).send( { error:`Genre Not Found` } )
        return;
    }
    res.send(genre)
})

router.post('/',async (req,res)=>{
    const { value, error } = validateGenre(req.body)
    if(error){
        res.status(400).send( { errors: error.details } )
        return;
    }
        

    const genre = new Genre( { ...value } )
    res.send(await genre.save())
    
    
})

router.put('/:id',async (req,res)=>{
    const { value, error } = validateGenre(req.body)
    if(error){
        res.status(400).send( { errors: error.details } )
        return;
    }
    const genre = await Genre.findByIdAndUpdate(req.params.id,{ ...value },{ new:true })
    if(!genre){
        res.status(404).send( { error:`Genre Not Found` } )
        return;
    }
    res.send(genre)
    
})

router.delete('/:id',async(req,res)=>{
    
    const genre = await Genre.findByIdAndDelete(req.params.id)
    if(!genre){
        res.status(404).send( { error:`Genre Not Found` } )
        return;
    }
    res.send(genre)
})

const validateGenre = (data)=>{
    const schema = Joi.object(
        {
            name:Joi.string().min(5).max(50),
    })
    return schema.validate(data)
}

module.exports = router