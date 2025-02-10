import bcrypt from "bcrypt";
import cors from "cors";
import "dotenv/config.js";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose, { mongo } from "mongoose";
import { User } from "./models/user.models.js";
import { authenticateToken } from "./utils/index.js";
import { Note } from "./models/note.model.js";

const app = express();
const port = 7000;
const connectionString = `mongodb+srv://yadavarmaan10:${process.env.MONGO_DB_PASSWORD}@cluster0.mr66k.mongodb.net/todo_app_mern`;

mongoose.connect(connectionString);

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send({ msg: "hello" });
});

// *Create Account

app.post("/create-account", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: true,
        message: "Account already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      fullName,
      password: hashedPassword,
    });

    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    return res.status(201).json({
      error: false,
      message: "Registration successful",
      user: {
        id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Account Creation Error:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// *Login account
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "Email and password are required" });
    }

    const isUser = await User.findOne({ email });
    if (!isUser) {
      return res
        .status(404)
        .json({ error: true, message: "Account does not exist" });
    }

    const isPasswordCorrect = bcrypt.compare(password, isUser.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ error: true, message: "Incorrect password" });
    }

    const accessToken = jwt.sign(
      { userId: isUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    return res.status(200).json({
      error: false,
      message: "Login successful",
      accessToken,
      user: {
        id: isUser._id,
        email: isUser.email,
        fullName: isUser.fullName,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// *Add a  note
app.post("/add-note", authenticateToken, async (req, res) => {
  try {
    const { title, content, tags, date, isPinned } = req.body;
    const user = req.user;

    if (!title || !content || !tags) {
      return res
        .status(400)
        .send({ error: true, message: "All fields are required" });
    }

    const note = new Note({
      content,
      isPinned,
      tags,
      title,
      userId: user.userId,
      date,
    });

    await Note.create(note);

    return res
      .status(200)
      .send({ error: false, message: "Note added successfully", note });
  } catch (error) {
    console.error("Add note error:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// *Get all notes for user
app.get("/get-notes", authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const notes = await Note.find({ userId: user.userId });
    return res
      .status(200)
      .send({ error: false, message: "notes  fetched successfully", notes });
  } catch (error) {
    console.error("Get Notes error :", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// *Delete a note
app.delete("/delete", authenticateToken, async (req, res) => {
  try {
    const { noteId } = req.body;
    const { userId } = req.user;

    const id = new mongoose.Types.ObjectId(noteId);

    await Note.deleteOne({ _id: id, userId });

    return res
      .status(200)
      .send({ error: false, message: "note deleted successfully" });
  } catch (error) {
    console.error("delete note error:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// *Edit a note
app.put("/edit-note", authenticateToken, async (req, res) => {
  try {
    const { updatedFields, noteId } = req.body;
    const { userId } = req.user;

    const _id = new mongoose.Types.ObjectId(noteId);
    const a = await Note.findOneAndUpdate({ _id, userId }, updatedFields);
    console.log(a);

    return res
      .status(200)
      .send({ error: false, message: "note updated successfully" });
  } catch (error) {
    console.error("edit note error:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// *Edit isPinned
app.put("/edit-isPinned", authenticateToken, async (req, res) => {
  try {
    const { isPinned, noteId } = req.body;
    const { userId } = req.user;

    const _id = new mongoose.Types.ObjectId(noteId);
    await Note.findOneAndUpdate({ _id, userId }, { isPinned });

    return res
      .status(200)
      .send({ error: false, message: "note's isPinned  updated successfully" });
  } catch (error) {
    console.error("edit isPinned note error:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// *Get User
app.get("/get-user", authenticateToken, async (req, res) => {
  try {
    const { userId: _id } = req.user;

    const user = await User.findOne({ _id }, { password: 0 });

    if (!user) {
      return res
        .status(400)
        .send({ error: true, messgae: "user does not exist" });
    }

    return res
      .status(200)
      .send({ error: false, message: "user fetched successfully", user });
  } catch (error) {
    console.error("get user note error:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

app.get("/get", async (req, res) => {
  const users = await User.find({
    fullName: { $regex: "^R", $options: "i" },
  });
  res.send({ users });
});

app.listen(port, function () {
  console.log("App is running at port ", port);
  console.log();
});
