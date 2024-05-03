const customers = require('./routes/customers')
const genres = require('./routes/genres')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const helmet = require('helmet')
const express = require('express')
const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(helmet())


app.use('/api/customers',customers)
app.use('/api/genres',genres)
app.use('/api/movies',movies)
app.use('/api/rentals',rentals)


const port = process.env.PORT | 3000
app.listen(port,()=>console.log(`Listening at Port: ${port}`))