import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  // Start a Mongoose session and transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    // Check if a user already exists with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists.");
      error.statusCode = 409;
      throw error;
    }

    // Hashed the pass using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user and save to the database
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save({ session });

    // Create jwt token for new user
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // Commit the transaction and end the session
    await session.commitTransaction();
    session.endSession();

    // Send success response with token and user data
    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: {
        token,
        user: newUser[0],
      },
    });
  } catch (error) {
    // Abort the transaction if any operation fails
    await session.abortTransaction();
    session.endSession();

    // Pass the error to the error-handling middleware
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    // Match password
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      const error = new Error("Invalid password.");
      error.statusCode = 401;
      throw error;
    }

    // Create jwt token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // Send success response with token and user data
    res.status(200).json({
      success: true,
      message: "User signed in successfully.",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {};
