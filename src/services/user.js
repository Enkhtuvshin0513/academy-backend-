import { db } from "../db.js";

export const createUser = async (
  username,
  email,
  password,
  firstname,
  lastname
) => {
  const response = await db.query(
    `INSERT INTO users (username, email, password, firstname, lastname) VALUES (${username}, ${email}, ${password}, ${firstname}, ${lastname}) RETURNING *`
  );
  return response.rows[0];
};
