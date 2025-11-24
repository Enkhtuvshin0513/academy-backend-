import { Router } from "express";

export const bankRouters = new Router();

bankRouters.post("/deposit", (req, res) => {
  console.log(req.user);

  if (!req.user) {
    res.send("Newtreigui bn");
  }
  res.send("success");
});
