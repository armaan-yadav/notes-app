import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: { type: [String], default: [] },
  date: String,
  isPinned: { type: Boolean, default: false },
  userId: String,
});

export const Note = mongoose.model("notes", noteSchema);
