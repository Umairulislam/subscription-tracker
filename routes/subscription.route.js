import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send("get all subscriptions");
});

subscriptionRouter.get("/:id", (req, res) => {
  res.send("get specific subscriptions");
});

subscriptionRouter.post("/", (req, res) => {
  res.send("create subscriptions");
});

subscriptionRouter.put("/:id", (req, res) => {
  res.send("update specific subscriptions");
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send("delete specific subscriptions");
});

subscriptionRouter.get("/user/:id", (req, res) => {
  res.send("get all subscriptions belonging to specific user");
});
subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send("cancel  subscriptions");
});
subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send("get upcoming renewals");
});

export default subscriptionRouter;
