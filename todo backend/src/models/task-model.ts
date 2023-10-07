import mongoose from "mongoose";
import taskSchemaProperties from "../schemaproperties/taskSchemaProperties";

const taskSchema = new mongoose.Schema(taskSchemaProperties, {
  timestamps: true,
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
