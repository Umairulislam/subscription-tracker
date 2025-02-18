import User from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    // Get all users
    const users = await User.find();

    res.status(200).json({
      success: true,
      message: "All users fetched successfully.",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleUser = async (req, res, next) => {
  try {
    // Get single user by id excluding password field
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
