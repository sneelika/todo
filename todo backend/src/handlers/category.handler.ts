import { NextFunction, Response } from "express";
import { AuthRequest } from "../middleware";
import Category from "../models/category-model";
import Task from "../models/task-model";
import { ICategory } from "../types";

export const getAllCategories = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const { user } = request;

    const categories = await Category.find({
      user: user,
    });

    return response.send(categories);
  } catch (error) {
    console.log("error in getAllCategories", error);
    next(error);
  }
};

/**
 *
 * @param request TODO: Record get category by id
 * @param response
 * @returns
 */

export const getCategoryById = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const { user } = request;
    const { id } = request.params;
    const category = await Category.findOne({
      _id: id,
    });
    return response.send(category);
  } catch (error) {
    console.log("error in getCategoryById", error);
    next(error);
  }
};

export const createCategory = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const { color, icon, name }: ICategory = request.body;
    const { user } = request;

    const category = await Category.create({
      color,
      icon,
      name,
      user,
    });
    response.send(category);
  } catch (error) {
    console.log("error in createCategory", error);
    next(error);
  }
};

export const deleteCategory = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.params;
    await Task.deleteMany({
      categoryId: id,
    });
    const category = await Category.deleteOne({
      _id: id,
    });
    response.send({ message: "Category deleted successfully" });
  } catch (error) {
    console.log("error in deleteCategory", error);
    next(error);
  }
};

export const updateCategory = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const { _id, color, icon, isEditable, name }: ICategory = request.body;
    await Category.updateOne(
      {
        _id,
      },
      {
        $set: {
          name,
          color,
          icon,
          isEditable,
        },
      }
    );
    response.send({ message: "Category updated successfully" });
  } catch (error) {
    console.log("error in updateCategory", error);
    next(error);
  }
};
