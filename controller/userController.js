
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async ( req, res) => {

    const {name,email,password} = req.body;

    if( !name || !email || !password ){
        return res.status(400).json({
            success: false,
            message:"all fields are required"
        });
    }

    try{
        const user = await User.findOne({email});

        const hashPassword = await bcrypt.hash(password,10);

        if( user){
            return res.status(400).json({
                success: false,
                message:"user already exists"
            });
        }

        const newuser = await User.create({
            name,
            email,
            password:hashPassword
        });

        const token = jwt.sign({
            _id:newuser._id 
        }, process.env.JWT_SECRET );

        res.status(200).cookie("token",token,{
            httpOnly:true,
            maxAge:15*60*1000,
            sameSite:"none",
            secure:true,
        }).json({
            success:true,
            message:"user created successfully",
            User: newuser
        });
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message:err.message
        });
    }
}

export const login = async ( req, res) => {

    const {email, password} = req.body;

    if( !email || !password ){
        return res.status(400).json({
            success: false,
            message:"all fields are required"
        });
    }

    try{
        const user = await User.findOne({ email});

        if( !user){
            return res.status(404).json({
                success: false,
                message:"User is not registered"
            });
        }

        const isMatchPassword  = await bcrypt.compare(password, user.password);

        if( !isMatchPassword){
            return res.status(404).json({
                success: false,
                message:"password does not match"
            });
        }

        const token = jwt.sign({
            _id:user._id 
        }, process.env.JWT_SECRET );

        res.status(200).cookie("token",token,{
            httpOnly:true,
            maxAge:15*60*1000,
            sameSite:"none",
            secure:true,
        }).json({
            success:true,
            message:"user logged in successfully",
            User: user
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        });
    }
}

export const getMyProfile = async (req, res) =>{

    try{
        let user = await User.findById(req.user);

        if( !user ){
            return res.status(404).json({
                success:false,
                message:"user not found"
            });
        }

        res.status(200).json({
            success:true,
            user:user,
            message:"user fetched successfully"
        });
    }
    catch (e) {
        res.status(500).json({
            success:false,
            user:err.message
        });
    }
}


export const logout = async (req, res) => { 

    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        sameSite:"none",
        secure:true,
    }).json({
        success: true,
        message:"Logout successfully"
    });
}

export const deleteUser = async (req, res) => {
    
    console.log("deleteUser");
    try{

        const user = await User.findById(req.user);

        if( !user){
            res.status(500).json({
                success:false,
                user:"user not found"
            });
        }

        const delUser = await user.deleteOne();

        res.status(200).cookie("token","",{
            expires:new Date(Date.now()),
            sameSite:"none",
            secure:true,
        }).json({
            success: true,
            message:"user deleted successfully",
            DELUser: delUser
        });
    }
    catch(err){

        res.status(500).json({
            success:false,
            user:err.message
        });
    }
}