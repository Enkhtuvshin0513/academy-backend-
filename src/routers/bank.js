import { Router } from "express";
import {
  createTransaction,
  getTransactions,
  getTransactionsByUserId,
  getTransactionsByAccountNumber
} from "../controllers/bank.js";

export const bankRouters = new Router();

bankRouters.post("/create-transaction", createTransaction);
bankRouters.get("/get-transactions", getTransactions);
bankRouters.get("/get-transactions-by-user-id", getTransactionsByUserId);
bankRouters.get(
  "/get-transactions-by-account-number",
  getTransactionsByAccountNumber
);
