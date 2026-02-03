import { Router, Request, Response } from "express";
import { Movies } from "./models";

export const movieRouter = Router();

movieRouter.get("/movies", async (req: Request, res: Response) => {
  const { genre } = req.query;

  const query = {} as any;

  if (genre) {
    query.genres = genre;
  }

  const movies = await Movies.find({ genres: genre }).limit(100);

  res.json(movies);
});
