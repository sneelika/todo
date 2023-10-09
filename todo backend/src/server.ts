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

app.use("/users", userRoutes, errorMiddleware);
app.use("/categories", authMiddleware, categoryRoutes, errorMiddleware);
app.use("/tasks", authMiddleware, taskRoutes, errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log("Server up and running");
});
