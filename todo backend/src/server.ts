import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDatabase from "./db";
import categoryRoutes from "./routes/category.routes";
import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();
const application = express();

application.use(express.json());
application.use(cors());

connectToDatabase();

application.get("/ping", (request: Request, response: Response) => {
  response.send("Pong");
});

application.use("/users", userRoutes);
application.use("/categories", categoryRoutes);
application.use("/tasks", taskRoutes);

application.listen(process.env.PORT, () => {
  console.log("Server up and running");
});
