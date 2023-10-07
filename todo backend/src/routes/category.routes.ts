import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../handlers/category.handler";
import { authMiddleware } from "../middleware";

const categoryRoutes = express.Router();

categoryRoutes.use(authMiddleware);

categoryRoutes.get("/", getAllCategories);
categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.post("/create", createCategory);
categoryRoutes.delete("/:id", deleteCategory);
categoryRoutes.put("/update", updateCategory);

export default categoryRoutes;
