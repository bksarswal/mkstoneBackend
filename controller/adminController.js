
const prodctSchema = require('../schema/prodectschema')
const bcrypt= require('bcrypt');
        exports.addProdects= (req,res)=>{
            const {name,catagary,price,discount,description,image}= req.body
      
                    prodctSchema.find({name:name}).then((r1)=>{
              if(r1.length>0){

                res.send({message:`prodect Allreday exist with this ${name} name`})
              }else{
                prodctSchema.insertMany({name:name,catagary:catagary,price:price,discount:discount,description:description,image:image}).then((result)=>{
        
                    res.status(201).send({status:201,message:"prodect upload succesfully"})
                    console.log(result);
                }).catch((err)=>{
               
                
                 if(err.name =='ValidationError'){
                
                    res.status(500).send({  status:500,message:` ${err.message.split(':')[1]} is require`})
                
                
                 }else if(err.name =='MongoBulkWriteError'){
                
                let value= err.message;
                let split =value.split(':')
                
                    res.status(500).send( {status:500,message:`   ${split[3].replace('{',"")} : ${ split[4].replace("}","")}is   allready exist `});
                 }
                 else{
                
                    res.send("some thing went wrong");
                 }
                
                })
              }

        
              
            }).catch((err)=>{
                res.send("some thing went wrong");
            })

        }