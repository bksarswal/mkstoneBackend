const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.DB_URL)

const db =  mongoose.connection;

db.on('error', ()=>{


    console.log('something went wrong db not connect');
})
db.once('open',()=>{

    console.log('dm successfully connected');
})

module.exports=db;