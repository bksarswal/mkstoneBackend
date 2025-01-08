const bcrypt = require('bcrypt')
const userSchema = require('../schema/userSchema')

const ragister =()=>{

    bcrypt.genSalt(10,function(err,salt){
        if(err){
   console.log('err in gansoult ');
        }
    else{
    
        
        bcrypt.hash('123456', salt,function(err,hash){
    
            if(err){
    
    
               console.log('ERR in hasing password');
            }
            else{
    
           
                userSchema.insertMany({name:'admin',email:'admin@gmail.com',mobile : '9119142594' ,password:hash,role:"admin"}).then((result)=>{
                   
    
    
    
                  console.log('admin login successfully');
                }).catch((err)=>{
    
    
                    
              
    console.log(err.message);
    
    
                 if(err.name =='ValidationError'){
    
                   console.log(` ${err.message.split(':')[1]} is require`);
    
    
                 }else if(err.name =='MongoBulkWriteError'){
    
           let value= err.message;
           let split =value.split(':')
    
                   console.log(` admin allready exist `);
                 }
                 else{
                   console.log('some thing went wrong');
                 }
                
                })
    
            }
        })
    }
    
    })
    }
    
    

    ragister();
  