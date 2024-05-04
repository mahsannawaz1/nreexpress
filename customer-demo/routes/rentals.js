const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const router = require('express').Router()
const auth = require('../middlewares/auth')
const Customer = require('../models/customer')
const Movie  = require('../models/movie')
const Rental = require('../models/rental')





router.get('/',auth,async(req,res)=>{
    res.send(await Rental.find())
})

router.get('/:id',auth,async(req,res)=>{
    const rental = await Rental.findById(req.params.id)
    if(!rental){
        res.status(404).send({ error:`Rental Not Found` })
        return;
    }
    res.send(rental)
})

router.post('/',auth,async(req,res)=>{
    const { value,error } = valdiateRental(req.body)
    if(error){
        res.status(400).send( { errors: error.details } )
        return;
    }
    mongoose.Types.ObjectId
    const customer = await Customer.findById(value.customerId)
    if(!customer){
        res.status(400).send( { error: 'Customer ID not found' } )
        return;
    }

    
    const movie = await Movie.findById(value.movieId)
    if(!movie){
        res.status(400).send( { error: 'Movie ID not found' } )
        return;
    }
    if(movie.numberInStock==0){
        res.status(400).send( { error: 'Movie is Out Of Stock' } )
        return;
    }
    
    if(!movie.genre){
        res.status(400).send( { error: 'Genre for given Movie not found' } )
        return;
    }
    let rental = new Rental({
        customer: {
            name:customer.name,
            isGold:customer.isGold,
            phone:customer.phone
        },
        genre: {
            name : movie.genre.name
        },
        movie: {
            title: movie.title,
            dailyRentalRate: parseInt(movie.dailyRentalRate),
            numberInStock: parseInt(movie.numberInStock)
        }
    })
    rental = await rental.save()

    movie.numberInStock--;
    movie.save()
    res.send(rental)
    
        // const task = Fawn.Task()
        // task    
        // .save('rentals',rental) //(collectionName,newObjectToSave)
        // .update('movies',{ _id:movie._id },{
        //     $inc: { numberInStock: -1 }
        // })
        // .run()
        // .then(resutls=>{
        //     console.log('Success')
        //     res.send(rental)
        // })
        // .catch(exception=>{
        //     res.status(500).send( { error:exception } )
        // })
        

        


    
})


const valdiateRental = (data)=>{
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    })
    return schema.validate(data)
}


module.exports = router