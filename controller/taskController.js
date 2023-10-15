
import { Task } from "../models/taskModel.js";

export const createTask = async (req, res) => {

    const {title, description, tag} = req.body;

    try{
        const note = await Task.create({
            title,
            description,
            tag,
            user:req.user
        });

        res.status(200).json({
            success: true,
            message:"Task created successfully",
            task: note
        });
    }
    catch(err){

        return res.status(500).json({
            success:false,
            message:err.message
        });
    }
}

export const getMyTask = async (req, res) => {

    try{

        const notes = await Task.find({user:req.user});

        res.status(200).json({
            success: true,
            message:"Task fetched successfully",
            tasks: notes
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        });
    }

}


export const editTask = async (req, res) => {

    try{

        const {id} = req.params;
        const {title,description,tag} = req.body;

        let task = await Task.findById(id);

        if( !task ){
            return res.status(400).json({
                success:false,
                message:"Task not found"
            });
        }

        const newTask = await Task.findByIdAndUpdate(id,req.body,{new:true});

        res.status(200).json({
            success: true,
            message:"Task edited successfully",
            task: newTask
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        });
    }
}

export const deleteTask = async (req, res) => {

    try{

        const {id} = req.params;

        let task = await Task.findById(id);

        if( !task ){
            return res.status(400).json({
                success:false,
                message:"Task not found"
            });
        }

        const delTask = await Task.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message:"Task deleted successfully",
            task: task
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        });
    }
}
