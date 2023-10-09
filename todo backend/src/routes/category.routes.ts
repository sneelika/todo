import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../handlers/category.handler";
import { authMiddleware } from "../middleware";
import { errorMiddleware } from "../middleware/error";

const categoryRoutes = express.Router();

categoryRoutes.get("/", authMiddleware, getAllCategories, errorMiddleware);
categoryRoutes.get("/:id", authMiddleware, getCategoryById, errorMiddleware);
categoryRoutes.post("/create", authMiddleware, createCategory, errorMiddleware);
categoryRoutes.delete("/:id", authMiddleware, deleteCategory, errorMiddleware);
categoryRoutes.put("/update", authMiddleware, updateCategory, errorMiddleware);

export default categoryRoutes;
