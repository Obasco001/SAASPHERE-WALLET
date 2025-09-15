import React from 'react';
import TransactionsList from './TransactionsList';

interface Transaction {
  id: number;
  date: string;
  amount: number;
  type: string;
  message?: string;
}

interface DashboardProps {
  loggedInUser: string;
  transactions: Transaction[];
  btcPrice: number | null;
  loadingPrice: boolean;
  priceError: string;
  recipient: string;
  amount: string;
  message: string;
  transferMessage: string;
  errorMessage: string;
  onRecipientChange: (value: string) => void;
  onAmountChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onTransferSubmit: (e: React.FormEvent) => void;
  onLogout: () => void;
  balance: number;
}

const Dashboard: React.FC<DashboardProps> = ({
  loggedInUser,
  transactions,
  btcPrice,
  loadingPrice,
  priceError,
  recipient,
  amount,
  message,
  transferMessage,
  errorMessage,
  onRecipientChange,
  onAmountChange,
  onMessageChange,
  onTransferSubmit,
  onLogout,
  balance,
}) => {
  return (
    <div className="app-container">
      <h1>Welcome, {loggedInUser}!</h1>
      <h2>Current Balance: ${balance.toFixed(2)}</h2>

      <div className="section">
        <h2>Live Bitcoin Price</h2>
        {loadingPrice ? (
          <p>Loading...</p>
        ) : priceError ? (
          <p style={{ color: 'red' }}>{priceError}</p>
        ) : (
          <p>1 BTC = ${btcPrice}</p>
        )}
      </div>

      <div className="section">
        <h2>Your Transactions</h2>
        <TransactionsList transactions={transactions} />
      </div>

      <div className="section">
        <h2>Transfer Funds</h2>
        <form onSubmit={onTransferSubmit}>
          <div>
            <label>Recipient Username:</label><br />
            <input
              type="text"
              value={recipient}
              onChange={(e) => onRecipientChange(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Amount:</label><br />
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Message (optional):</label><br />
            <input
              type="text"
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
            />
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {transferMessage && <p style={{ color: 'green' }}>{transferMessage}</p>}
          <button type="submit">Send</button>
        </form>
      </div>

      <div className="logout-container">
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
