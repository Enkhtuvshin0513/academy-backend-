export const createUser = async (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;

  const user = await createUser(username, email, password, firstname, lastname);

  res.json(user);
};

export const updateUser = (req, res) => {
  //id ашиглаж user update hiih
  const { id, username, email, password, firstname, lastname } = req.body;

  res.send("Success!");
};
