import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send({ title: "get all user" });
});

userRouter.get("/:id", (req, res) => {
  res.send({ title: "get specific user" });
});
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
