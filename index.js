
// const express = require('express');
import express from "express";
const app = express();

import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";

import cookieParser from "cookie-parser";
import cors from "cors"; 


// load config from env file
// require("dotenv").config();
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 4000;

// middleware to parse json body
app.use(express.json());
app.use(cookieParser());

// cors
app.use(cors());

// mount routes
app.use("/user",userRouter);
app.use("/task",taskRouter);


// start server 
app.listen(PORT, () =>{
    console.log(`server started successfully at ${PORT}`);
});

//connect to the database
// const dbConnect = require('./config/database');
import dbConnect from "./config/database.js";
dbConnect();

app.get('/',(req,res)=>{
    res.send(`<h1>Welcome To MERN Project Jitendriya !!!</h1>`)
});