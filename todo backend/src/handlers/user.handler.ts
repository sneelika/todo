import { Request, Response } from "express";
import {
  createUserFromModels,
  loginUserFromModels,
} from "../models/user-model";

export const createUser = async (request: Request, response: Response) => {
  try {
    await createUserFromModels(request, response);
  } catch (error) {
    console.log("error in createUser", error);
  }
};

export const loginUser = async (request: Request, response: Response) => {
  try {
    await loginUserFromModels(request, response);
  } catch (error) {
    console.log("error in loginUser", error);
  }
};
