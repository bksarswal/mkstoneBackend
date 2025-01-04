const mongoose = require('mongoose');

const otpSchema= new mongoose.Schema({

    uid:{ type:"string",
            require:true,
            

         },
    otp:{ type:"string",
            require:true,
            

         },
    time:{ type:"string",
            require:true,
            

         },

       
})


const  otp= mongoose.model('otp',otpSchema);

module.exports=otp;