const jwt = require('jsonwebtoken')

const authorization= async(req,res,next)=>{
    let token = req.headers.authorization.split(' ')[1]
    try{
        jwt.verify(token,"AJAY1234", function(err,docoded){
            if(err){
                res.send("Please Login again")
            }else{
                req.body.user_id = docoded.user_id
                next()
            }
        })


    }catch(error){
        res.send(error)
    }


}
module.exports =authorization