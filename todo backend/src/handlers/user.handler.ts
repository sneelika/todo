import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import User from "../models/user-model";
import { IUser } from "../types";

const getUserToken = (_id: string | Types.ObjectId) => {
  const authenticatedUserToken = jwt.sign({ _id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  return authenticatedUserToken;
};

export const createUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = request.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(409).send("user already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return response.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log("error in createUser", error);
    next(error);
  }
};
export const loginUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { email, password }: IUser = request.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return response.status(409).send({ message: "User doesn't exist" });
    }
    const isPasswordIdentical = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordIdentical) {
      const token = getUserToken(existingUser._id);
      return response.send({
        token,
        user: {
          email: existingUser.email,
          name: existingUser.name,
        },
      });
    } else {
      return response.status(400).send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.log("error in loginUser", error);
    next(error);
  }
};
