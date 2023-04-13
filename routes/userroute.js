const express=require("express");
const {User}=require("../model/usermodel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userroute=express.Router();


userroute.post("/register",async(req,res)=>{

    const {email,mobile,name,dob,password,isAdmin}=req.body;
    
    
   try{
        
   let exist=await User.findOne({email:email});

   if(exist){
    res.send({msg:"user already registered please login"});

   }

   else{

    bcrypt.hash(password, 5, async function(err, hash) {
        
        if(err){
            res.send(err);
        }

        else{

            const user=new User({email,mobile,name,dob,password:hash,isAdmin});

            await user.save();
            res.send({msg:"user registered successfully"});
        }
    });

   }

   }
   catch(err){
    console.log(err);
   }
})


userroute.post("/login",async(req,res)=>{

    const {email,password}=req.body;

    try{

        const user=await User.find({email});

        if(user.length>0){

            bcrypt.compare(password, user[0].password, function(err, result) {
                if(result){
                    
                    const token=jwt.sign({ id: user[0]._id }, 'auth');

                    res.send({msg:"Login successful",token:token,name:user[0].name,admin:user[0].isAdmin || false})
                }
                else{
                    res.send({msg:"Wrong credentials"});
                }
            });

        }
        else{
            res.send({msg:"please login first"});
        }
    }
    catch(err){
        res.send({msg:"something went wrong try again"});
    }
})



module.exports={userroute};
