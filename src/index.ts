import express from "express";
import type { Request, Response } from "express";

import { userRouters } from "./routers/user.js";
import { bankRouters } from "./routers/bank.js";
// import { connectDb } from "./db.js";

const app = express();

app.use(express.json());

app.use("/user", userRouters);
app.use("/bank", bankRouters);

//without param
app.get("/example-one", (req: Request, res: Response) => {
  res.send("test");
});
// with param
app.get("/example-one/:id", (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;
  res.send(id);
});
// with query & param
app.get(
  "/example-two/:id",
  (req: Request<{ id: string }, {}, {}, { name: string }>, res: Response) => {
    const id = req.params.id;
    const name = req.query.name;

    res.json({ id, name });
  }
);

app.post(
  "/example-three",
  (
    req: Request<{ id: string }, {}, { firstname: string; lastname: string }>,
    res: Response
  ) => {
    const firstname = req.body.firstname;

    res.json({ firstname });
  }
);

// await connectDb();

app.listen(3000, () => {
  console.log("express app running at 3000");
});
