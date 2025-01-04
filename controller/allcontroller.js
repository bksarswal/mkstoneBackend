
const schema= require('../schema/allSchema')
const bcrypt= require('bcrypt');


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
        
               
                    schema.insertMany({name:name,email:email,mobile : mobile ,password:hash}).then((result)=>{
                       
        
        
        
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
        

        exports.login = (req, res) => {

            const { email, password } = req.body;
            if (!email || !password) {
        
                res.status(401).send({ status: 401, message: "email and password is required" })
            }
            else {
        
        
        
                schema.find({ email: email }).then((result) => {
        
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