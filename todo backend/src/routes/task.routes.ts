import express from "express";
import {
  createTask,
  deleteTask,
  editTask,
  getAllCompletedTasks,
  getAllTasks,
  getAllTasksByCategory,
  getTasksForToday,
  toggleTaskStatus,
} from "../handlers/task.handler";
import { authMiddleware } from "../middleware";
import { errorMiddleware } from "../middleware/error";

const taskRoutes = express.Router();

taskRoutes.get("/", authMiddleware, getAllTasks, errorMiddleware);
taskRoutes.get(
  "/tasks-by-categories/:id",
  authMiddleware,
  getAllTasksByCategory,
  errorMiddleware
);
taskRoutes.get(
  "/completed",
  authMiddleware,
  getAllCompletedTasks,
  errorMiddleware
);
taskRoutes.get("/today", authMiddleware, getTasksForToday, errorMiddleware);
taskRoutes.post("/create", authMiddleware, createTask, errorMiddleware);
taskRoutes.put(
  "/update/:id",
  authMiddleware,
  toggleTaskStatus,
  errorMiddleware
);
taskRoutes.delete("/:id", authMiddleware, deleteTask, errorMiddleware);
taskRoutes.put("/edit/:id", authMiddleware, editTask, errorMiddleware);

export default taskRoutes;
