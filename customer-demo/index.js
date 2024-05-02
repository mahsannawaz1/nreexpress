const helmet = require('helmet')
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('public'))
app.use(helmet())

const port = process.env.PORT | 3000
app.listen(port,()=>console.log(`Listening at Port: ${port}`))