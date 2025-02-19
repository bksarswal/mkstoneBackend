const mongoose = require('mongoose');

const otpSchema= new mongoose.Schema({

    uid:{ type:String,
            required:true,
            

         },
    otp:{ type:String,
            required:true,
            

         },
    time:{ type:String,
            required:true,
            

         },

       
})


const  otp= mongoose.model('otp',otpSchema);

module.exports=otp;