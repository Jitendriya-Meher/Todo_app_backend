
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/userModel.js";
dotenv.config();

export const isAuthenticated = async (req, res, next) => {

    const {token} = req.cookies;

    if( ! token){
        return res.status(403).json({
            success: false,
            message:"Login again"
        });
    }

    const decode = jwt.verify( token , process.env.JWT_SECRET );

    req.user = await User.findById(decode._id);

    next();
}