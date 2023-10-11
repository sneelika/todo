import mongoose from "mongoose";
import { Response } from "express";
import userSchemaProperties from "../schemaproperties/userSchemaProperties";
import { Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { IUser } from "../types";

const userSchema = new mongoose.Schema(
  userSchemaProperties,

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

const getUserToken = (_id: string | Types.ObjectId) => {
  const authenticatedUserToken = jwt.sign({ _id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  return authenticatedUserToken;
};

export const createUserFromModels = async (
  request: Request,
  response: Response
) => {
  try {
    const { name, email, password } = request.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(409).send("User already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return response.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in createUserFromModels:", error);
  }
};

export const loginUserFromModels = async (
  request: Request,
  response: Response
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
    console.error("Error in loginUserFromModels:", error);
  }
};

export default User;
