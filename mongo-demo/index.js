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
            enum: ['web','mobile','network']
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
            }
        }
    }
)

const Course = mongoose.model('Course',courseSchema)


async function createCourse(){
    const course = new Course({
        // name:'React ',
        author:'Ahsan Nawaz',
        tags:null, 
        isPublished:false,
        price:49.99,
        category:'-'
    })
    try{
        //  await course.validate()
        const result = await course.save()
        console.log(result)
    }
    catch(exception){
        for(prop in exception.errors)
            console.log(exception.errors[prop].message) //exception.errors[prop] returns ValidationError object
        
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
    const pageNumber = 2
    const pageSize=10
    const courses = await Course
    .find()
    .or([
        {price:{$gte:15}},
        {name:/.*by.*/},
        {isPublished:true}
        ])
    .sort('-price')
    .select('name author')
    console.log(courses)
}
async function updateCourse(id){
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
    const course = await Course.findByIdAndUpdate(id,{
        $set:{
            author:'Usama Nawaz',
            isPublished:true
            }
    },{new:true})
    console.log(course)  
}
async function deleteCourse(id){
    //Method 1
    //    const deletedCourse = await Course.deleteOne({_id:id})
    //    console.log(deletedCourse)

    //Method 2
    const deletedCourse = await Course.findByIdAndDelete(id)
    console.log(deletedCourse)

}
createCourse()