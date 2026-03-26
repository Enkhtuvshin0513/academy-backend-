import { Users } from "../db/models.ts";
import { type IContext } from "../../index.ts";

export const userQueries = {
  users: async (_root: any, _args: any, { user }: IContext) => {
    return Users.find({});
  },
};
