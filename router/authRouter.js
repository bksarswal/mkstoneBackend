const express= require("express");
const authRouter = express.Router();

const authController= require('../controller/authController');

// authRouter.post('/admin',authController.authragister);
authRouter.post('/prodect',authController.addProdects);
authRouter.post('/sendmail',authController.sendmail);
authRouter.post('/resetpass',authController.forgotpassword);
authRouter.post('/ragister',authController.ragister);
authRouter.post('/verify-otp',authController.verifyotp);
authRouter.post('/login',authController.login);


module.exports =authRouter;