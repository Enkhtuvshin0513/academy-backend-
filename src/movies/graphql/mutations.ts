import { Movies } from "../db/models.ts";
import { type IMovie } from "../types/movie.ts";

export const movieMutations = {
  addMovie: async (_root: any, { input }: { input: IMovie }) => {
    const movie = await Movies.create(input);
    return movie._id.toString();
  },
  updateMovie: async (_root: any, { _id, input }: { _id: string; input: Partial<IMovie> }) => {
    const movie = await Movies.findByIdAndUpdate(_id, input, { new: true });
    if (!movie) throw new Error("Movie not found");
    return movie._id.toString();
  },
  //test
  deleteMovie: async (_root: any, { _id }: { _id: string }) => {
    const movie = await Movies.findByIdAndDelete(_id);
    if (!movie) throw new Error("Movie not found");
    return "Movie deleted successfully";
  },
};
