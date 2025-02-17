import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name is required."],
      trim: true,
      min: [2, "User Name must be at least 2 characters."],
      max: [50, "User Name must be at most 50 characters."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      min: [6, "Password must be at least 6 characters."],
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
