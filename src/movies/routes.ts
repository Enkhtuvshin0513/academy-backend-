import { Router, Request, Response } from "express";

export const movieRouter = Router();

movieRouter.get("/movies", (req: Request, res: Response) => {
  res.send("test");
});
