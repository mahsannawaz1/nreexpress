const Joi = require('joi')
const router = require('express').Router()
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const { Genre } = require('../models/genre')



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

router.post('/',auth,async(req,res)=>{
    const { value, error } = validateGenre(req.body)
    if(error){
        res.status(400).send( { errors: error.details } )
        return;
}

    const genre = new Genre( { ...value } )
    res.send(await genre.save())
    
    
})

router.put('/:id',auth,async (req,res)=>{
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

router.delete('/:id',[auth,admin],async(req,res)=>{
    
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