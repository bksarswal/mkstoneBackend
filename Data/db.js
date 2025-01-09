const mongoose = require('mongoose');

mongoose.connect('process.env.db')

const db =  mongoose.connection;

db.on('error', ()=>{


    console.log('something went wrong db not connect');
})
db.once('open',()=>{

    console.log('dm successfully connected');
})

module.exports=db;
