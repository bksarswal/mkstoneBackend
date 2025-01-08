const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name:{ type:"string",
            require:true,
            

         },

         mobile:{
            type:"string",
            require:true,
            unique:true
         },
         email:{
            type:"string",
            require:true,
            unique:true
         },
         password:{
            type:"string",
            require:true,
            
         },
         role:{
            type:"string",
            require:true
         }
})


const  authdata= mongoose.model('userData',userSchema);

module.exports=authdata;