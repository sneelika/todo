import express from "express";
import { createUser, loginUser } from "../handlers/user.handler";

const userRoutes = express.Router();

userRoutes.post("/create", createUser);
userRoutes.post("/login", loginUser);

export default userRoutes;
