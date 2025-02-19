const express= require("express");
const userRouter = express.Router();

const userController= require('../controller/userController');


userRouter.post('/ragister',userController.ragister);
userRouter.post('/login',userController.login);
userRouter.post('/sendmail',userController.sendmail);
userRouter.post('/verify-otp',userController.verifyotp);
userRouter.post('/reset',userController.forgotpassword);
userRouter.post('/getprotects',userController.getallProdects);
userRouter.post('/addtocart',userController.addToCart);
userRouter.post('/gettocart',userController.getToCarts)


module.exports =userRouter;