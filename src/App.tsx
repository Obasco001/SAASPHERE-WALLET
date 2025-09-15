import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './LoginForm';
import TransactionsList from './TransactionsList';
import Dashboard from './Dashboard';
import SignupForm from './SignupForm';



type User = {
  username: string;
  password: string;
};

type Transaction = {
  id: number;
  date: string;
  amount: number;
  type: string;
  message?: string;
};

type TransactionsMap = {
  [username: string]: Transaction[];
};


function App() {
  const [users, setUsers] = useState([
  { username: 'Olamide', password: '1234' },
  { username: 'Raymond', password: '0000' },
]);


  const [transactions, setTransactions] = useState({
    Olamide: [
      { id: 1, date: '2025-09-14', amount: 1000000000, type: 'deposit' },
      { id: 2, date: '2025-09-15', amount: -20, type: 'withdrawal' },
      { id: 3, date: '2025-09-15', amount: -10000, type: 'Transaction' },
      { id: 4, date: '2025-09-15', amount: -50, type: 'withdrawal' },
    ],
    Raymond: [
      { id: 1, date: '2025-09-13', amount: 500000, type: 'deposit' },
      { id: 2, date: '2025-09-14', amount: -10, type: 'withdrawal' },
    ],
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

const [isSignup, setIsSignup] = useState(false);


  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [transferMessage, setTransferMessage] = useState('');

  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [priceError, setPriceError] = useState('');

useEffect(() => {
  async function fetchBtcPrice() {
    setLoadingPrice(true);
    setPriceError('');
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched BTC price data:', data);

      if (data.bitcoin && data.bitcoin.usd) {
        setBtcPrice(data.bitcoin.usd);
      } else {
        setPriceError('Unexpected API response structure');
      }
    } catch (error) {
      console.error('Error fetching Bitcoin price:', error);
      setPriceError('Failed to load Bitcoin price');
    } finally {
      setLoadingPrice(false);
    }
  }

  if (loggedInUser) {
    fetchBtcPrice();
  }
}, [loggedInUser]);


  const handleLogin = (event) => {
    event.preventDefault();
const handleSignup = (event: React.FormEvent) => {
  event.preventDefault();

  if (!username.trim() || !password.trim()) {
    setErrorMessage('Please enter both username and password.');
    return;
  }

  const userExists = users.some(user => user.username === username);
  if (userExists) {
    setErrorMessage('Username already exists. Please choose another.');
    return;
  }

  setUsers(prev => [...prev, { username, password }]);

  setTransactions(prev => ({
    ...prev,
    [username]: [],
  }));

  setErrorMessage('');
  setLoggedInUser(username);
  setUsername('');
  setPassword('');
};


    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      setLoggedInUser(foundUser.username);
      setErrorMessage('');
    } else {
      setErrorMessage('Wrong username or password');
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setUsername('');
    setPassword('');
    setErrorMessage('');
    setRecipient('');
    setAmount('');
    setMessage('');
    setTransferMessage('');
    setBtcPrice(null);
  };

  const getBalance = (user) => {
    const userTx = transactions[user] || [];
    return userTx.reduce((sum, tx) => sum + tx.amount, 0);
  };

  const handleTransfer = (e) => {
    e.preventDefault();

    setTransferMessage('');
    setErrorMessage('');

    const amt = parseFloat(amount);

    const recipientExists = users.some((user) => user.username === recipient);
    if (!recipientExists) {
      setTransferMessage('');
      setErrorMessage('Recipient user does not exist.');
      return;
    }

    if (isNaN(amt) || amt <= 0) {
      setTransferMessage('');
      setErrorMessage('Please enter a valid amount greater than 0.');
      return;
    }

    const senderBalance = getBalance(loggedInUser);
    if (amt > senderBalance) {
      setTransferMessage('');
      setErrorMessage('Insufficient funds.');
      return;
    }

    const newSenderTxId = (transactions[loggedInUser]?.length || 0) + 1;
    const newRecipientTxId = (transactions[recipient]?.length || 0) + 1;

    const today = new Date().toISOString().split('T')[0];

    setTransactions((prev) => ({
      ...prev,
      [loggedInUser]: [
        ...(prev[loggedInUser] || []),
        {
          id: newSenderTxId,
          date: today,
          amount: -amt,
          type: 'withdrawal',
          message: `Transfer to ${recipient}: ${message}`,
        },
      ],
      [recipient]: [
        ...(prev[recipient] || []),
        {
          id: newRecipientTxId,
          date: today,
          amount: amt,
          type: 'deposit',
          message: `Transfer from ${loggedInUser}: ${message}`,
        },
      ],
    }));

    setRecipient('');
    setAmount('');
    setMessage('');

    setTransferMessage(`Successfully sent $${amt.toFixed(2)} to ${recipient}.`);
  };

 if (loggedInUser) {
  const userTransactions = transactions[loggedInUser] || [];
  const balance = getBalance(loggedInUser);

  return (
    <Dashboard
      loggedInUser={loggedInUser}
      transactions={userTransactions}
      btcPrice={btcPrice}
      loadingPrice={loadingPrice}
      priceError={priceError}
      recipient={recipient}
      amount={amount}
      message={message}
      transferMessage={transferMessage}
      errorMessage={errorMessage}
      onRecipientChange={setRecipient}
      onAmountChange={setAmount}
      onMessageChange={setMessage}
      onTransferSubmit={handleTransfer}
      onLogout={handleLogout}
      balance={balance}
    />
  );
}


return (
  <div className="auth-container">
    {isSignup ? (
      <>
        <SignupForm
          username={username}
          password={password}
          onUsernameChange={setUsername}
          onPasswordChange={setPassword}
          onSignup={handleSignup}
          errorMessage={errorMessage}
        />
        <p>
          Already have an account?{' '}
          <button onClick={() => setIsSignup(false)}>Login here</button>
        </p>
      </>
    ) : (
      <>
        <LoginForm
          username={username}
          password={password}
          onUsernameChange={setUsername}
          onPasswordChange={setPassword}
          onLogin={handleLogin}
          errorMessage={errorMessage}
        />
        <p>
          Don't have an account?{' '}
          <button onClick={() => setIsSignup(true)}>Sign up here</button>
        </p>
      </>
    )}
  </div>
);



}

export default App;
