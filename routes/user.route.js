import { Router } from "express";
import { getAllUsers, getSingleUser } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:id", authorize, getSingleUser);

userRouter.post("/", (req, res) => {
  res.send({ title: "create user" });
});
userRouter.put("/:id", (req, res) => {
  res.send({ title: "update user" });
});
userRouter.delete("/:id", (req, res) => {
  res.send({ title: "delete specific user" });
});

export default userRouter;
