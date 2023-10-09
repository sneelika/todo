import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../middleware";
import Task from "../models/task-model";
import { ITask } from "../types";

export const getAllTasks = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = request.user;
    const tasks = await Task.find({
      user: userId,
    });
    response.send(tasks);
  } catch (error) {
    console.log("error in getAllTasks", error);
    next(error);
  }
};

export const getAllTasksByCategory = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = request.user;
    const { id } = request.params;
    const tasks = await Task.find({
      user: userId,
      categoryId: id,
    });
    response.send(tasks);
  } catch (error) {
    console.log("error in getAllTasksByCategory", error);
    next(error);
  }
};

export const getAllCompletedTasks = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = request.user;
    const tasks = await Task.find({
      user: userId,
      isCompleted: true,
    });
    response.send(tasks);
  } catch (error) {
    console.log("error in getAllTasksByCategory", error);
    next(error);
  }
};

export const getTasksForToday = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = request.user;
    const todaysISODate = new Date();
    todaysISODate.setHours(0, 0, 0, 0);
    const tasks = await Task.find({
      user: userId,
      date: todaysISODate.toISOString(),
    });
    response.send(tasks);
  } catch (error) {
    console.log("error in getAllTasksByCategory", error);
    next(error);
  }
};

export const createTask = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = request.user;
    const { name, date, categoryId }: ITask = request.body;

    const task = await Task.create({
      name,
      date,
      categoryId,
      user: userId,
    });
    response.send(task);
  } catch (error) {
    console.log("error in getAllTasksByCategory", error);
    next(error);
  }
};

export const toggleTaskStatus = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const { isCompleted } = request.body;
    const { id } = request.params;

    const task = await Task.updateOne(
      {
        _id: id,
      },
      {
        isCompleted: isCompleted,
      }
    );
    response.send({ message: "Task status updated" });
  } catch (error) {
    console.log("error in getAllTasksByCategory", error);
    next(error);
  }
};

export const deleteTask = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.params;
    await Task.deleteOne({
      _id: id,
    });
    response.send({ message: "Task deleted" });
  } catch (error) {
    console.log("error in getAllTasksByCategory", error);
    next(error);
  }
};

export const editTask = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const { _id, categoryId, date, name }: ITask = request.body;
    await Task.updateOne(
      {
        _id,
      },
      {
        $set: {
          name,
          categoryId,
          date,
        },
      }
    );
    response.send({ message: "Task updated successfully" });
  } catch (error) {
    console.log("error in getAllTasksByCategory", error);
    next(error);
  }
};
