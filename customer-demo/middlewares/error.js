function error(error,req,res,next){
    // Log the exception
    res.status(500).send({error:'Something failed'})
    return;
}
module.exports = error