function asyncMiddleware(routeHandler){
    return async(req,res,next)=>{
        try{
            await routeHandler(req,res)
        }
        catch(exception){
            next(exception)
        }
    }
}
module.exports = asyncMiddleware