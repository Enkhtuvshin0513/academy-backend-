import inquirer from "inquirer";
import fs from "node:fs/promises";

export const bankAnswer = async (users, user) => {
  const { bankOption } = await inquirer.prompt([
    {
      type: "select",
      name: "bankOption",
      message: "Login Or Signup",
      choices: [
        { name: "Deposit", value: "deposit" },
        { name: "Withdraw", value: "withdraw" },
        { name: "History all", value: "history-all" },
        { name: "History deposit", value: "history-deposit" },
        { name: "History withdraw", value: "history-deposit" },
        { name: "Check balance", value: "check-balance" },
        { name: "Transaction", value: "transaction" },
        { name: "Exit", value: "exit" }
      ]
    }
  ]);

  switch (bankOption) {
    case "deposit":
      await deposit(users, user);
      break;
    case "withdraw":
      console.log("withdraw");
      break;
    case "history":
      console.log("history");
      break;
    case "check-balance":
      console.log("check-balance");
      break;
    case "exit":
      process.exit();
  }
};

const updateUser = async (users, user, amount, type) => {
  const userData = JSON.stringify(users);

  await fs.writeFile("users.json", userData, "utf-8");

  const historyRawData = await fs.readFile("history.json", "utf-8");
  const history = JSON.parse(historyRawData);

  const userHistories = history[user.username] || [];

  userHistories.push({
    type,
    amount,
    balance: user.balance,
    currentBalance: 0
  });

  history[user.username] = userHistories;

  const historyData = JSON.stringify(history);

  await fs.writeFile("history.json", historyData, "utf-8");
  console.log("Amjilttai");

  return;
};

const deposit = async (users, user) => {
  let balance = parseInt(user.balance) || 0;

  const { amount } = await inquirer.prompt([
    {
      type: "number",
      name: "amount",
      message: "Hediin orlogo hiih we?"
    }
  ]);

  balance = balance + amount;

  user.balance = balance;

  return await updateUser(users, user, amount, "deposit");
};
