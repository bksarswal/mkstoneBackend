
const express =require('express');
const allRouter= express.Router();


const controller= require('../controller/allcontroller');

allRouter.post('/admin-user',controller.ragister);
allRouter.post("/login", controller.login)



module.exports= allRouter;