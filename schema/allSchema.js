const mongoose = require('mongoose');

const schema= new mongoose.Schema({

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
            
         }
})


const data = mongoose.model('data',schema);

module.exports=data;