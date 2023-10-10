import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectToDatabase from "./db";
import categoryRoutes from "./routes/category.routes";
import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes";
import { authMiddleware } from "./middleware";
import { errorMiddleware } from "./middleware/error";

dotenv.config();
const app = express();

app.use(express.json());

connectToDatabase();

app.get("/ping", (request: Request, response: Response) => {
  response.send("Pong");
});

app.use("/users", errorMiddleware, userRoutes);
app.use("/categories", authMiddleware, errorMiddleware, categoryRoutes);
app.use("/tasks", authMiddleware, errorMiddleware, taskRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server up and running");
});
