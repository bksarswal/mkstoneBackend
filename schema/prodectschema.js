 const mongoose= require('mongoose');

 const prodctSchema = new mongoose.Schema({

    name:{ type:String,
        required:true
    },
    catagary:{
        type:String,
        required:true
    },
    price:{ type:String,
        required:true
    },
    discount:{
        type:String,
        
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
 })

 const prodedData = mongoose.model('prodectData',prodctSchema);
 module.exports=prodedData;