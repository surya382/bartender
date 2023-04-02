
const jwt = require('jsonwebtoken');

const authenticate=(req,res,next)=>{

    const token=req.headers.authorization;

    if(token){
       
        jwt.verify(token, 'auth', function(err) {
          
            if(err){
                res.send("You are not authorized");
            }
            else{
                next();
            }
          });
    }
    else{
        res.send("Please Login")
    }

}

module.exports={authenticate}