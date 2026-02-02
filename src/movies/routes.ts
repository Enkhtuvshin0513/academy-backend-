import { Router, Request, Response } from "express";
import { Movies } from "./models";

export const movieRouter = Router();

movieRouter.get("/movies", async (req: Request, res: Response) => {
  console.log("movies");
  const movies = await Movies.find({}).limit(100);

  console.log(movies);

  res.json(movies);
});
