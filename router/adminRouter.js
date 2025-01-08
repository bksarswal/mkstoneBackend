
const express =require('express');
const adminRouter= express.Router();


const adminController= require('../controller/adminController');


adminRouter.post('/prodect',adminController.addProdects)


module.exports= adminRouter;