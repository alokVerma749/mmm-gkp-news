
import { Schema, model, models } from "mongoose";

// Define the Task schema
const TaskSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Create the Task model
const Task = models.Task || model("Task", TaskSchema);

export default Task;
