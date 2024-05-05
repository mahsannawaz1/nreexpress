
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
name: String,
bio: String,
website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
name: String,
authors: [authorSchema]
}));

async function createCourse(name, authors) {
const course = new Course({
name, 
authors
}); 

const result = await course.save();
console.log(result);
}

async function listCourses() { 
const courses = await Course.find();
console.log(courses);
}
async function updateAuthor(courseId){
    // const course = await Course.findById(courseId)
    // course.author.name = 'Mosh Hamedani'
    // course.save()
    const course = await Course.updateOne({_id:courseId},{
        $unset:{
            'author':''
        }
    })
    console.log(course)
}
async function addAuthor(courseId,author){
    const course = await Course.findById(courseId)
    course.authors.push(author)
    course.save()
    console.log(course)
    
}
async function deleteAuthor(courseId,authorId){
    let course = await Course.findById(courseId)
    course.authors.pull(authorId)
    course = await course.save()
    console.log(course)
    
}

// createCourse('Node Course',[new Author({name:'Ahsan'}),new Author({name:'Usama'})])
// updateAuthor('6633d91f70070d9171d882f7')
// addAuthor('6633dd334aa6100f13f3d58c',new Author({name:'Usman'}))
deleteAuthor("6633dd334aa6100f13f3d58c",'6633dd334aa6100f13f3d58b')