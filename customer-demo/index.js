const customers = require('./routes/customers')
const genres = require('./routes/genres')
const helmet = require('helmet')
const express = require('express')
const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(helmet())


app.use('/api/customers',customers)
app.use('/api/genres',genres)



const port = process.env.PORT | 3000
app.listen(port,()=>console.log(`Listening at Port: ${port}`))