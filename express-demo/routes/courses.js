const courseAPI = require('../../mongo-demo/index')
console.log(courseAPI)
const express  =require('express')
const Joi = require('joi')
const router = express.Router()


router.get('/',(req,res)=>{
    courseAPI.getCourses().then(courses=>{
        
        res.send(courses)
    })
    
    
})

router.get('/:id',(req,res)=>{
    console.log(req.params.id)
    courseAPI.getCourse(req.params.id).then(course=>{
        res.send(course)
    })
})

router.post('/',(req,res)=>{
    
    const schema = Joi.object({
        name:Joi.string().min(3).max(255).required(),
        category:Joi.string().required(),
        author:Joi.string(),
        tags:Joi.array().items(Joi.string()).min(1).required(),
        
        isPublished:Joi.boolean(),
        price:Joi.number().min(1).max(100)
    })
    const {value,error} = schema.validate(req.body)
    
    
    if(error){
        const errors=[]
        for(err of error.details)
            errors.push(err.message)
        res.status(400).send(errors)
        return;
    }

    courseAPI.createCourse(value)
    .then(result=>{
        
        if(result.errors){
            const errs=[]
            for(err in result.errors)
                errs.push(result.errors[err].message)
            console.log(errs)
            res.status(400).send(errs)
        }
        res.send(result)
    })


})
router.put('/:id',(req,res)=>{
    
    let foundCourse = courses.find(course=>course.id===parseInt(req.params.id))
    if(!foundCourse){
        res.status(400).send(`Course ID doesn't exist`)
        return;
    }

    const schema = Joi.object({
        name:Joi.string().min(3).required()
    })
    const {value,error} = schema.validate(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }
    foundCourse.name = value.name

    res.send(foundCourse)

})
router.delete('/:id',(req,res)=>{
    let foundCourse = courses.find(course=>course.id===parseInt(req.params.id))
    if(!foundCourse){
        res.status(400).send(`Course ID doesn't exist`)
        return;
    }
    courses.filter(course=>course.id!==foundCourse.id)
    res.send(foundCourse)
})
module.exports = router