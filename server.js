const express = require('express');
require('dotenv').config
const app=express();
const PORT=  process.env.PORT||8879;

const bodyParser= require('body-parser');
const cors = require('cors');

app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const db=require('./Data/db')
const userRouter= require('./router/userRouter')
const adminRouter= require('./router/adminRouter');
const ragister_admin= require('./Data/ragister_Admin')
app.use('/admin',adminRouter)
app.use('/user', userRouter);

app.listen(PORT,'0.0.0.0', ()=>{
    console.log(`Server is start on port:${PORT}`);
})
