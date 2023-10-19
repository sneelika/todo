import mongoose from "mongoose";
import { Response } from "express";
import userSchemaProperties from "../schemaproperties/userschema-properties";
import { Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser } from "../types";
import { getAccessToken, getRefreshToken } from "../utils/token";

const userSchema = new mongoose.Schema(
  userSchemaProperties,

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export const handleNewUser = async (request: Request, response: Response) => {
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

export const handleLoginUser = async (request: Request, response: Response) => {
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

    if (!isPasswordIdentical) {
      return response.status(400).send({ message: "Wrong credentials" });
    }

    //Generate access token and refresh token

    const access_token = getAccessToken(existingUser._id);
    const refresh_token = getRefreshToken(existingUser._id);

    console.log(access_token);
    console.log(refresh_token);

    console.log(existingUser);
    console.log(existingUser._id);

    // Databse query to update the refresh token

    const filter = { _id: existingUser._id };
    const update = { refreshToken: refresh_token, logged_at: new Date() };

    const result = await User.findOneAndUpdate(filter, update, { new: true });

    console.log(result);

    // Parse Refresh Token to the httpCookie
    response.cookie("jwt", refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return response.status(200).json({
      access_token,
      user: {
        email: existingUser.email,
        name: existingUser.name,
      },
    });
  } catch (error) {
    console.error("Error in loginUserFromModels:", error);
  }
};

export const handleNewAccessToken = async (
  request: Request,
  response: Response
) => {
  console.log("requesting new access token");

  // Get the cookies from the request
  const cookies = request.cookies;

  //Search for the cookie where cookie name is "jwt"
  if (!cookies?.jwt) {
    console.log("Invalid refresh token :", cookies?.jwt);
    return response.status(401).json({ message: "Invalid token" });
  }

  const refresh_token = cookies.jwt;
  console.log(refresh_token);

  const auth = await User.findOne({ refreshToken: refresh_token });

  if (!auth) {
    console.log("invalid refresh token :", refresh_token);
    return response.status(403).json({ message: "Invalid token" });
  }

  await jwt.verify(
    refresh_token,
    process.env.REFRESH_SECRET_KEY,
    (err, decoded) => {
      console.log("decoded ", decoded);
      console.log("auth ", auth);
      console.log("Auth ID: ", auth._id, "Decoded ID: ", decoded._id);
      const objectId = auth._id;
      const objectIdString = objectId.toHexString();
      if (err || objectIdString !== decoded._id) {
        console.log("requesting new access token failed invalid token");
        return response.status(403).json({ message: "Invalid token" });
      }

      // Check: check if need to update refresh token also
      const access_token = getAccessToken(auth._id);
      console.log("new access token getting sucessfully");
      return response.status(200).json({
        message: "Refresh token successful",
        access_token: access_token,
      });
    }
  );
};

export const handleLogout = async (request: Request, response: Response) => {
  const cookies = request.cookies;
  console.log("cookiee value :", cookies);

  if (!cookies?.jwt) {
    return response.status(204).json({ message: "No token found" });
  }

  const refresh_token = cookies.jwt;

  const auth = await User.findOne({ refreshToken: refresh_token });

  if (!auth) {
    return response.status(404).json({ message: `User does not exist...` });
  }

  const result = await User.findOneAndUpdate(
    { refreshToken: refresh_token },
    { $set: { refreshToken: null } }
  );

  console.log(result);

  response.clearCookie("jwt");
  return response.status(200).json({
    message: "Logout successful",
  });
};

export default User;
