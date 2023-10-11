import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectToDatabase from "./db";
import categoryRoutes from "./routes/category.routes";
import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes";
import { authMiddleware } from "./middleware";

dotenv.config();
const app = express();

app.use(express.json());

connectToDatabase();

app.get("/ping", (request: Request, response: Response) => {
  response.send("Pong");
});

app.use("/users", userRoutes);
app.use("/categories", authMiddleware, categoryRoutes);
app.use("/tasks", authMiddleware, taskRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server up and running");
});
