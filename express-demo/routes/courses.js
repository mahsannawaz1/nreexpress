const express  =require('express')
const router = express.Router()
let courses=
    [
        {id:1,name:'C1'},
        {id:2,name:'C2'},
        {id:3,name:'C3'}
    ]


router.get('/',(req,res)=>{
    res.send(courses)
})

router.get('//:id',(req,res)=>{
    res.send(`Course ${req.params.id}`) 
})
router.post('/',(req,res)=>{
    
    const schema = Joi.object({
        name:Joi.string().min(3).required()
    })
    const {value,error} = schema.validate(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }
    const course = {
        id:courses.length + 1,
        name:value.name
    }
    courses.push(course)
    res.send(course)
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