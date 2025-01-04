
const prodctSchema = require('../schema/prodectschema')
const bcrypt= require('bcrypt');
const nodemailer = require("nodemailer");

const authschema =require('../schema/authauscham')
const otpSchema= require('../schema/otpSchema');
const { now } = require('mongoose');

exports.ragister =(req,res)=>{


   

  const {name, mobile,email ,password}= req.body;
  
  
  
  if(!password){
  
      res.send('password is required ')
  }
  else{
  
  
  bcrypt.genSalt(10,function(err,salt){
      if(err){
  res.status(500).send({status:500, message:"err in gansoult " })
      }
  else{
  
      
      bcrypt.hash(password, salt,function(err,hash){
  
          if(err){
  
  
              res.status(500).send({status:500,message:"ERR in hasing password"})
          }
          else{
  
         
              authschema.insertMany({name:name,email:email,mobile : mobile ,password:hash}).then((result)=>{
                 
  
  
  
                  res.status(201).send({status:201,message:"user created successfully"})
              }).catch((err)=>{
  
  
                  
            
  console.log(err.message);
  
  
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
      })
  }
  
  })
  }
  
  }


const transporter = nodemailer.createTransport({
    
  service:"gmail",   
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "bholusaini2112@gmail.com",
    pass: "mnye cqgp jsmo rkvm",
  },
});


exports.sendmail= (req,res)=>{

  transporter.sendMail({
    from: '" Foo Koch 👻" <bholusaini2112@gmail.com>', // sender address
    to: " bholusaini686@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  }).then((result)=>{

    console.log(result);
  }).catch((err)=>{

    console.log(err);
  })

}


exports.verifyotp=(req,res)=>{
 
  const { email,otp,n_pass}= req.body;


  authschema.find({email:email}).then((r1)=>{

   if(r1.length >0){
  
    var u_id= r1[0]._id;


    otpSchema.find({uid:u_id}).then((r2)=>{


      if(r2.length >0){
    if(otp==r2[0].otp){

     if((Number(new Date(Date.now())))- ( Number(r2[0].time)) > 60000){
      res.status(400).send({status:400,message:"otp  has expired"});
     }else{
     
     
     bcrypt.genSalt(10,function(err,salt){
     if(err){
      console.log(err);
      res.status(400).send({status:400,message:"something went rong"});
     }else{
 
      bcrypt.hash(n_pass,salt,function(err,hash){

        if(err){
          console.log(err);
          res.status(400).send({status:400,message:"something went rong"});
        }
        else{

          authschema.updateOne({email:email}, {$set:{password:hash}}).then((res_u)=>{

           if(res_u.modifiedCount==1){
            res.status(201).send({status:201, message:"password update succesfully"})
           }else{
            res.status(400).send({status:400,message:"something went rong"});
           }
          }).catch((err)=>{
            console.log(err);
            res.status(500).send({status:500,message:'something wentrong'});
          })
        }
      })


     }
    })

     }
    }else{

      res.status(400).send({status:400,message:"otp did not match"});
    }

      }else{
        res.status(400).send({status:400,message:"something went rong"});
      }
    }).catch((err)=>{
      console.log(err);
      res.status(500).send({status:500,message:"something went rong"});

    })

   }
   else{

res.status(400).send({status:400,message:"something went rong"});
   }

  }).catch((err)=>{

    console.log(err);
    res.status(500).send({status:500,message:"something went rong"});
  })
   





 


}

exports.forgotpassword= (req, res)=>
  {

    const {email}= req.body;

    const otp = Math.floor(Math.random()* 567889).toString().padStart(6,0);
   
    authschema.find({email:email}).then((result)=>
    {

     if(result.length > 0)
      {

      var uid = result[0]._id;
         

      otpSchema.deleteOne({uid:uid}).then((dres)=>{

        if(dres.deletedCount==1||dres.deletedCount==0.0){

          transporter.sendMail({
            from: '" Foo Koch 👻" <bholusaini2112@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "password  forgot ", // Subject line
            text: "OTP", // plain text body
            html: `<h1> hell  ${result[0].name }  your password rest otp is ${otp}</h1>`, // html body
          }).then((result_m)=>
            { 
     
    
              if(result_m.hasOwnProperty('accepted') && result_m['accepted'].length > 0 &&  result_m['messegId'] !== null){
    
                otpSchema.insertMany({uid:uid, otp:otp, time:Number(new Date(Date.now()))}).then((result2)=>
                  {
    
                 if(result2.length >0){
    
                  res.status(200).send({status:200,message:"otp send "})
             
            
                 }
                 else
                 {
                   
                  res.status(500).send({status:500, message :"somthing went rong"});
                 }
                }).catch((err)=>{
           
                 
                  res.status(500).send({status:500, message :"somthing went rong"});
                })
    
              }
              //
              else{
              
                res.status(500).send({status:500, message :"somthing went rong"});
               
              }
            
          //
            }).catch((err)=>{
           
            res.status(500).send({status:500, message :"somthing went rong"});
          })
        }else{
          res.status(500).send({status:500,message:'something wentrong'});

        }
        
      }).catch((err)=>{

        res.status(400).send({status:400,message:'something wentrong'});

      })

     }
     //
     else
     {
      res.status(500).send({status:500,message:`user not fount wit this ${email}`})

     }
    })
    .catch((err)=>{
      res.status(500).send({status:500,message:`user not fount wit this ${email}`})
     
    })
         
}

exports.addProdects= (req,res)=>{

   

    const {name,catagary,price,description,image}= req.body

    

prodctSchema.insertMany({name:name,catagary:catagary,price:price,description:description,image:image}).then((result)=>{

    res.status(201).send({status:201,message:"prodect upload succesfully"})
    console.log(result);
}).catch((err)=>{


    

console.log(err.message);


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






exports.login = (req, res) => {

  const { email, password } = req.body;
  if (!email || !password) {

      res.status(401).send({ status: 401, message: "email and password is required" })
  }
  else {



      authschema.find({ email: email }).then((result) => {

          bcrypt.compare(password, result[0].password, function (err, auth) {

              if (err) {

                  res.status(500).send({ status: 500, message: "somethng went rong" })
              }
              else {

                  if (auth == true) {

                      const { id, name, email, mobile } = result[0];

                      res.status(200).send({ status: 200, message: "user login  successfully", data: { _id: id, name: name, email: email, mobile: mobile } })
                  }
                  else {


                      res.status(401).send({ status: 401, message: "password is incorrect  try again" })
                  }


              }
          })

      }).catch((err) => {


          res.status(401).send({ status: 401, message: "usr not found" })
      })

  }


}




     