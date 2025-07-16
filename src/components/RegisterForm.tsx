import React, { useState } from 'react';
import { useToast } from '../hooks/useToast';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const RegisterForm: React.FC = () => {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showToast } = useToast();
  const navigate = useNavigate();

// Inside handleSubmit of RegisterForm.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // 1. Attempt to register the user
    await register({ token, username, email, password }); // This call typically just confirms registration success to the backend.

    showToast('Registration successful! Logging you in...', 'success');

    // 2. Immediately perform a login request with the newly registered credentials
    const { token: jwtToken, role } = await login({ username, password }); // This gets the JWT

    // 3. Store the JWT and role
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('role', role);

    // 4. Determine redirection based on role and onboarding status
    if (role === 'HR') {
      navigate('/hr/dashboard'); // HR users don't go through employee onboarding
      return;
    }

    if (role === 'EMPLOYEE') {
        showToast('Account setup complete! Please proceed with onboarding.', 'success');
        navigate('/employee/onboarding');
      return;
    }

    showToast('Unknown role received after registration. Please contact support.', 'danger');

  } catch (err: unknown) {
    let message = 'Registration or immediate login failed.';
    if (err instanceof Error) {
      message = err.message;
    } else if (typeof err === 'string') {
      message = err;
    }
    showToast(message, 'danger');
  }
};

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 shadow rounded bg-white" style={{ minWidth: '350px' }}>
        <h4 className="mb-4 text-center">Register</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Registration Token</label>
            <input
              type="text"
              className="form-control"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;