export const createTransaction = async (req, res) => {
  const { user_id, amount, transaction_type } = req.body;
  const transaction = await createTransaction(
    user_id,
    amount,
    transaction_type
  );
  res.json(transaction);
};

export const getTransactions = async (req, res) => {
  const { user_id } = req.query;
  const transactions = await getTransactions(user_id);
  res.json(transactions);
};

export const getTransactionsByUserId = async (req, res) => {
  const { user_id } = req.query;
  const transactions = await getTransactionsByUserId(user_id);
  res.json(transactions);
};

export const getTransactionsByAccountNumber = async (req, res) => {
  const { account_number } = req.query;
  const transactions = await getTransactionsByAccountNumber(account_number);
  res.json(transactions);
};
