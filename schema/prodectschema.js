 const mongoose= require('mongoose');
const { create } = require('./allSchema');

 const prodctSchema = new mongoose.Schema({

    name:{ type:"string",
        require:true
    },
    catagary:{
        type:"string",
        require:true
    },
    price:{ type:"number",
        require:true
    },
    description:{
        type:"string",
        require:true
    },
    image:{
        type:"string",
        require:true
    }
 })

 const prodedData = mongoose.model('prodectData',prodctSchema);
 module.exports=prodedData;