
const jwt = require('jsonwebtoken')
function auth(req,res,next){
    const token = req.header('x-auth-token')
    if(!token){
        res.status(401).send({error:'Access denied. No token provided'})
        return;
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user = decoded
        next()
    }
    catch(exception){
        res.status(400).send({error:'Invalid Token'})
    }

}

module.exports = auth