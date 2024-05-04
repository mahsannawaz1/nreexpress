function admin(req,res,next){
    if(!req.user.isAdmin){
        res.status(403).send({error:'Access denied. User is not an Admin'})
        return;
    }
    next()
}
module.exports = admin