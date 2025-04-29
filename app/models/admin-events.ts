import { Schema, model, models } from "mongoose";

// Define the Event schema
const EventSchema = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true }, // ISO date string
  time: { type: String, required: true }, // Time in HH:mm format
  type: { type: String, default: "other" }, // Type of event (e.g., editorial, content, maintenance)
  createdAt: { type: Date, default: Date.now }, // Auto-generated timestamp
});

// Create the Event model
const Event = models.Event || model("Event", EventSchema);

export default Event;
