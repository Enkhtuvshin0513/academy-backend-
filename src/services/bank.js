export const createAccount = async (user_id, account_number, balance) => {
  const response = await db.query(
    `INSERT INTO users (user_id, email, password) VALUES ($1, $2, $3) RETURNING *`,
    [username, email, password],
  );
  return response.rows[0];
};
