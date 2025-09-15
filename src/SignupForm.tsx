import React from 'react';

type SignupFormProps = {
  username: string;
  password: string;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSignup: (e: React.FormEvent) => void;
  errorMessage: string;
};

const SignupForm: React.FC<SignupFormProps> = ({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSignup,
  errorMessage,
}) => {
  return (
    <form onSubmit={onSignup}>
      <h2>Sign Up</h2>

      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
          />
        </label>
      </div>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
