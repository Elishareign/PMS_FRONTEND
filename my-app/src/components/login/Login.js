import React, { useState } from 'react';
import "./Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded credentials for authentication
    const correctEmail = 'elishamier13@gmail.com';
    const correctPassword = 'siasia123';

    // Check if email and password match the hardcoded credentials
    if (email === correctEmail && password === correctPassword) {
      // If login is successful, call the onLogin function passed from the parent component
      onLogin();
    } else {
      // If authentication fails, show an error message
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container"> {/* Add specific class here */}
      <div className="wrapper">
        <div className="title">
          <span>Welcome back</span>
        </div>
        <p className="title_para">Please enter your details to sign in.</p>

        {error && <div className="error-message">{error}</div>} {/* Display error message */}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <input
              type="text"
              placeholder="Enter your email..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="row">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="pass"><a href="#">Forgot password?</a></div>
          <div className="row button">
            <input type="submit" value="Login" />
          </div>
          <div className="signup-link">Not a member? <a href="#">Signup now</a></div>
        </form>
      </div>
    </div>
  );
};

export default Login;
