const customers = require('../routes/customers')
const genres = require('../routes/genres')
const movies = require('../routes/movies')
const rentals = require('../routes/rentals')
const users = require('../routes/users')
const auth = require('../routes/auth')
const error = require('../middlewares/error')
function routes(app){
    app.use('/api/customers',customers)
    app.use('/api/genres',genres)
    app.use('/api/movies',movies)
    app.use('/api/rentals',rentals)
    app.use('/api/users',users)
    app.use('/api/auth',auth)
    app.use(error)
}
module.exports = routes