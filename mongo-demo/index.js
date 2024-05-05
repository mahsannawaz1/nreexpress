const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/playground')
.then(()=>console.log('Connected to MongoDB...'))
.catch(err=>console.error(`Couldn't connect to MongoDB...`,err))

const  courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength:3,
            maxlength:255,
        },
        category: {
            type:String,
            required: true,
            enum: ['web','mobile','network'],
            lowercase:true,
            // uppercase:true,
            trim:true
        },
        author: String,
        tags: {
            type:Array,
            validate: { // custom validator
                validator: function(value){
                    return value && value.length > 0 
                },
                message:'A course must have at least one tag.'
            }
        },
        date: { type: Date,default: Date.now },
        isPublished: Boolean,
        price: {
            type: Number,
            min: 1,
            max: 100,
            required: function() { //use anonymous functions instead of arrows
                return this.isPublished
            },
            get: value => value.toFixed(2),
            set: value => value.toFixed(2)
        }
    }
)

const Course = mongoose.model('Course',courseSchema)


async function createCourse(data){
    const course = new Course({
        ...data
    }) 
    try{
        //  await course.validate()
        return await course.save()
        
    }
    catch(exception){
        // for(prop in exception.errors)
        //     console.log(exception.errors[prop].message) //exception.errors[prop] returns ValidationError object
        return exception
        
    }

}
async function getCourses(){
    // eq-- equal
    //ne -- not equal
    //gt -- greater than
    //gte -- greater tha equal to
    //lt -- less than
    //lte -- less than equal to
    //in 
    //nin -- not in
    // const pageNumber = 2
    // const pageSize=10
    const courses = await Course
    .find()
    // .or([
    //     {price:{$gte:15}},
    //     {name:/.*by.*/},
    //     {isPublished:true}
    //     ])
    // .sort('-price')
    // .select('name author')
    // console.log(courses)
    return courses
}
async function getCourse(id){

    // const pageNumber = 2
    // const pageSize=10
    try {
        return await Course
        .findById(id)
    }
    catch(exception){
       return exception
    }

    // .or([
    //     {price:{$gte:15}},
    //     {name:/.*by.*/},
    //     {isPublished:true}
    //     ])
    // .sort('-price')
    // .select('name author')
    
}
async function updateCourse(id,data){
    //Method 1
    // const course = await Course.findById(id)
    // if(!course) return;
    // course.set({
    //     isPublished:true,
    //     author:'Updated Author'
    // })
    // const updatedCourse = await course.save()
    // console.log(updatedCourse)

    //Method 2
    // const updatedCourse = await Course.updateOne({_id:id},{
    //     $set:{
    //         author:'Ahsan Nawaz',
    //         isPublished:false
    //     }
    // })
    //console.log(updatedCourse)

    //Method 3
   
    try{
        const course = await Course.findByIdAndUpdate(id,{
            $set:{
               ...data
                }
        },{new:true})
        return course
    }
    catch(exception){
        return exception
    }

}
async function deleteCourse(id){
    //Method 1
    //    const deletedCourse = await Course.deleteOne({_id:id})
    //    console.log(deletedCourse)

    //Method 2
    try{
        return await Course.findByIdAndDelete(id)
    }
    catch(exception){
        return exception
    }

}
module.exports.getCourses = getCourses
module.exports.getCourse = getCourse
module.exports.updateCourse = updateCourse
module.exports.deleteCourse = deleteCourse
module.exports.createCourse = createCourse