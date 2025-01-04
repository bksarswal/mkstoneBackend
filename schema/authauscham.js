const mongoose = require('mongoose');

const authschema = new mongoose.Schema({

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


const  authdata= mongoose.model('authdata',authschema);

module.exports=authdata;