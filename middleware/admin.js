const jwt = require('jsonwebtoken');
const {User}=require("../model/usermodel")

const admin=(req,res,next)=>{

    let token=req.headers.authorization;

    if(token){
      
        jwt.verify(token,'auth',async(err,decoded)=>{
             
            if(err){
                res.send("Please login first");
            }
            else{
                
                const {isAdmin}=await User.findOne({_id:decoded.id});

                if(isAdmin){
                    next();
                }
                else{
                    res.send("you are not authorized");
                }

            }
        })
    }
    else{
        res.send("Please login first")
    }


}

module.exports={admin};