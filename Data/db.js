const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/e-commers')

const db =  mongoose.connection;

db.on('error', ()=>{


    console.log('something went wrong db not connect');
})
db.once('open',()=>{

    console.log('dm successfully connected');
})

module.exports=db;