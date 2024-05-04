const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const router = require('express').Router()
const auth = require('../middlewares/auth')
const Movie  = require('../models/movie')
const { Genre }  = require('../models/genre')



router.get('/',async(req,res)=>{
    res.send(await Movie.find())
})
router.get('/:id',async(req,res)=>{
    const movie = await Movie.findById(req.params.id)
    if(!movie){
        res.status(404).send({ error:`Movie Not Found` })
        return;
    }
    res.send(movie)
})

router.post('/',auth,async(req,res)=>{
    const { value,error } = validateMovie(req.body)
    if(error){
        res.status(400).send( { errors: error.details } )
        return;
    }
    const genre = await Genre.findById(value.genreId)
    if(!genre){
        res.status(404).send( { error:`Genre ID Not Found` } )
        return;
    }
    const movie = new Movie({
        title:value.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock:value.numberInStock,
        dailyRentalRate:value.dailyRentalRate,

    })
    res.send(await movie.save())
})

router.put('/:id',auth,async(req,res)=>{
    const movie = await Movie.findById(req.params.id)
    if(!movie){
        res.status(404).send({ error:`Movie Not Found` })
        return;
    }

    const { value,error } = validateMovie(req.body)
    if(error){
        res.status(400).send( { errors: error.details } )
        return;
    }
    const genre = await Genre.findById(value.genreId)
    if(!genre){
        res.status(404).send( { error:`Genre ID Not Found` } )
        return;
    }

    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,{
        $set:{
            title:value.title,
            genre:{
                _id:genre._id,
                name:genre.name
            },
            numberInStock:value.numberInStock,
            dailyRentalRate:value.dailyRentalRate,
        }
    },{ new:true })
    res.send( updatedMovie )
})

router.delete('/:id',auth,async(req,res)=>{
    
    const movie = await Movie.findByIdAndDelete(req.params.id)
    if(!movie){
        res.status(404).send( { error:`Movie Not Found` } )
        return;
    }
    res.send(movie)
})



const validateMovie = (data)=>{
    const schema = Joi.object({
        title:Joi.string().min(3).max(255).required(),
        numberInStock:Joi.number().min(0).max(100).required(),
        dailyRentalRate:Joi.number().min(0).max(100).required(),
        genreId:Joi.objectId().required(),
    })
    return schema.validate(data)
}

module.exports = router