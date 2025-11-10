import fs from "node:fs/promises";
import inquirer from "inquirer";

const getUsers = async () => {
  const userRawData = await fs.readFile("users.json", "utf-8");

  const users = JSON.parse(userRawData);

  return users;
};

const { auth } = await inquirer.prompt([
  {
    type: "select",
    name: "auth",
    message: "Login Or Signup",
    choices: ["Login", "Signup"]
  }
]);

if (auth === "Login") {
  const { username, password } = await inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "Enter your username"
    },
    {
      type: "password",
      name: "password",
      message: "Enter your password"
    }
  ]);

  const users = await getUsers();

  const user = users.find(value => {
    return value.username === username && value.password === password;
  });

  console.log(user);
}
