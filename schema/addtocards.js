

const mongoose= require('mongoose');


  const Cartschema= new mongoose.Schema(
    {
       p_id:{
          type:Number,
          required:true

       },
       u_id:{

        type:Number,
        required:true
       },
       
       quantity:{
              
       type:Number,
        required:true
       },
       timestamp:{
       type:Number,
       required:true

       }

    }
  )

  const Cartprodect= mongoose.model('Cart',Cartschema);
  module.exports = Cartprodect;