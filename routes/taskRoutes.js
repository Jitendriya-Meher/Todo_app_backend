
import express from 'express';
const router = express.Router();

import { createTask,getMyTask,editTask,deleteTask } from '../controller/taskController.js';
import { isAuthenticated } from '../middlewares.js/auth.js';


router.post("/create",isAuthenticated,createTask);
router.post("/my",isAuthenticated,getMyTask);
router.patch("/:id",isAuthenticated,editTask);
router.delete("/:id",isAuthenticated,deleteTask);

export default router;