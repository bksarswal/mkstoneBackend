const mongoose = require('mongoose');

const otpSchema= new mongoose.Schema({

    uid:{ type:"string",
            required:true,
            

         },
    otp:{ type:"string",
            required:true,
            

         },
    time:{ type:"string",
            required:true,
            

         },

       
})


const  otp= mongoose.model('otp',otpSchema);

module.exports=otp;