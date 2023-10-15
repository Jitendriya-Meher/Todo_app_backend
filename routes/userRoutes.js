
import express from 'express';
const router = express.Router();

import { isAuthenticated } from '../middlewares.js/auth.js';

import { login,logout,deleteUser,register,getMyProfile } from '../controller/userController.js';


router.post("/register",register);
router.post("/login",login);
router.post("/logout",isAuthenticated,logout);
router.get("/profile",isAuthenticated,getMyProfile);
router.delete("/delete",isAuthenticated,deleteUser);

export default router;