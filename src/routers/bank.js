import { Router } from "express";
import {
  createTransaction,
  getTransactions,
  getTransactionsByAccountNumber,
} from "../controllers/bank.js";
import { createAccount, updateAccount } from "../controllers/bank.js";
export const bankRouters = new Router();

//danstai holbootoi route uud

bankRouters.post("/create-account", createAccount);
bankRouters.post("/update-account", updateAccount);

// danstai holbootoi get route uud

bankRouters.get("/", getTransactions);
bankRouters.get(
  "/get-transactions-by-account-number",
  getTransactionsByAccountNumber,
);
