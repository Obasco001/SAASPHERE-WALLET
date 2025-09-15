import React from 'react';

interface LoginFormProps {
  username: string;
  password: string;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onLogin: (event: React.FormEvent) => void;
  errorMessage?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onLogin,
  errorMessage,
}) => {
  return (
    <form onSubmit={onLogin}>
      <h2>Login to SAASPHERE Wallet</h2>
      <div>
        <label>Username:</label><br />
        <input
          type="text"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label><br />
        <input
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          required
        />
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
