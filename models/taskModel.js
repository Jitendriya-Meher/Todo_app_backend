
import mongoose from "mongoose";
import { User } from "./userModel.js";
const {Schema} = mongoose;

const taskSchema = new Schema({

    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        require:true
    },
    tag:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default : Date.now
    }
    
});

export const Task = mongoose.model("Task",taskSchema);