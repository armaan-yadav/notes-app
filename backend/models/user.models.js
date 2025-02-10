import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  createdOn: { type: Date, default: Date.now() },
});

export const User = mongoose.model("users", userSchema);
