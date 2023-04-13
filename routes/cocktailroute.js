const {Drink}=require("../model/cockmodel")

const express=require("express");
const { admin } = require("../middleware/admin");

const cocktailroute=express.Router();



cocktailroute.get("/",async(req,res)=>{

    const {page,sort,filt,q}=req.query;
    

    try{
 

        if(page && sort && filt && q){

            let val=sort=="asc"?1:-1;


            let s=(Number(page))*10;
            let data=await Drink.find({$and:[{base:filt},{name:{$regex:`${q}`}}]}).sort({price:val}).skip(s-10).limit(10);
            res.send(data);


        }

        else if(page && sort && q){

            let val=sort=="asc"?1:-1;


            let s=(Number(page))*10;
            let data=await Drink.find({name:{$regex:`${q}`}}).sort({price:val}).skip(s-10).limit(10);
            res.send(data);

        }


        else if(page && filt && q){

            let s=(Number(page))*10;
            let data=await Drink.find({$and:[{base:filt},{name:{$regex:`${q}`}}]}).skip(s-10).limit(10);
            res.send(data);

        }

        else if(page && sort && filt){

            let val=sort=="asc"?1:-1;


            let s=(Number(page))*10;
            let data=await Drink.find({base:filt}).sort({price:val}).skip(s-10).limit(10);
            res.send(data);

        }

        else if(page && sort){
            let val=sort=="asc"?1:-1;


            let s=(Number(page))*10;
            let data=await Drink.find().sort({price:val}).skip(s-10).limit(10);
            res.send(data);

        }



        else if(page &&  q){

            let s=(Number(page))*10;

            let data=await Drink.find({name:{$regex:`${q}`}}).skip(s-10).limit(10);
            res.send(data);

        }

        else if(page && filt){

            let s=(Number(page))*10;
            let data=await Drink.find({base:filt}).skip(s-10).limit(10);
            res.send(data);
                 
        }

        
             else{
                
                let s=(Number(page))*10;
                let data=await Drink.find().skip(s-10).limit(10);
                res.send(data);
             }
            
          

       


    }
    catch(err){
        console.log(err);
    }
})

cocktailroute.get("/:id",async(req,res)=>{

      let id=req.params.id;

    try{

   let data=await Drink.findById(id);
   res.send(data);

    }
    catch(err){
        console.log(err);
    }
})

cocktailroute.use(admin);

cocktailroute.post("/addcocktail",async(req,res)=>{

    try{

        const cock=new Drink(req.body);
        await cock.save();

        res.send("cocktail added successfully");

    }
    catch(err){
        res.send(err);
        console.log(err);
    }
})

cocktailroute.patch("/:id",async(req,res)=>{

    const id=req.params.id;

    try{

        await Drink.findByIdAndUpdate(id,req.body);
        res.send("cocktail details updated successfully");

    }
    catch(err){
        res.send(err);
    }
})


cocktailroute.delete("/:id",async(req,res)=>{

    const id=req.params.id;
    console.log(id);

    try{

        await Drink.findByIdAndDelete(id);
        res.send("cocktail deleted successfully");

    }
    catch(err){
        res.send(err);
    }
})

module.exports={cocktailroute};