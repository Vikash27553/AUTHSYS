import express from 'express';
import {registerUser,forgotpassword,changePassword, verification, loginUser,logoutUser, verifyOtp } from  '../controller/userController.js'
import { isAuthenticated } from '../middleware/isAuthenticated.js';
// import { userSchema } from '../Validators/userValidate.js';
const router = express.Router();

// importing user model route handler
router.post('/register', registerUser );
router.post('/verify',verification );
router.post('/login', loginUser );
router.post('/logout',isAuthenticated, logoutUser );
router.post('/forgot', forgotpassword  );
router.post('/forgot', forgotpassword  );
router.post('/verifyotp/:email', verifyOtp);
router.post('/reset/:email', changePassword );

export default router;

