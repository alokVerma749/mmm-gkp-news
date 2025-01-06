import mongoose, { Schema, Document } from "mongoose";

interface ISuggestion extends Document {
  title: string;
  description: string;
  category: string;
  relatedLinks?: string[];
  name?: string;
  email?: string;
}

const SuggestionSchema: Schema<ISuggestion> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  relatedLinks: { type: [String], required: false },
  name: { type: String, required: false },
  email: { type: String, required: false },
}, { timestamps: true });

const Suggestion = mongoose.models.Suggestion || mongoose.model<ISuggestion>('Suggestion', SuggestionSchema);

export default Suggestion;
