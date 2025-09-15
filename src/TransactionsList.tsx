import React from 'react';

interface Transaction {
  id: number;
  date: string;
  amount: number;
  type: string;
  message?: string;
}

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return <p>No transactions found.</p>;
  }

  return (
    <ul>
      {transactions.map(({ id, date, amount, type, message }) => (
        <li key={id}>
          <strong>{date}:</strong> {type} {amount > 0 ? '+' : ''}
          {amount.toFixed(2)} {message && ` — ${message}`}
        </li>
      ))}
    </ul>
  );
};

export default TransactionsList;
