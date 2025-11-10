import fs from "node:fs/promises";
import inquirer from "inquirer";

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
}
