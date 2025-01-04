const express = require('express');
const app=express();
const PORT=8879;

const bodyParser= require('body-parser');
const cors = require('cors');

app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const db=require('./Data/db')
const allrouter= require('./router/allrouter');
const authrouter= require('./router/authRouter');
 app.use('/', allrouter);
 app.use('/admin',authrouter)

app.listen(PORT, ()=>{
    console.log(`Server is start on port:${PORT}`);
})
