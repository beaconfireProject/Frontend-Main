import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Removed the 'error' state, as we'll only use toasts for errors
  // const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // No need to clear error state if we're not displaying it directly
    // setError('');

    try {
      // If login is successful, `data` will directly contain { token, role }
      const { token, role } = await login({ username, password });

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'HR') {
        showToast('Logged in as HR!', 'success');
        navigate('/hr/dashboard');
        return;
      }

      if (role === 'EMPLOYEE') {
        showToast('Logged in as Employee (Approved)!', 'success');
        navigate('/employee/home');
        return;
      }

      // Only show toast for unknown role, do not set local error state
      // setError('Unknown role received from backend. Please contact support.');
      showToast('Unknown role received from backend. Please contact support.', 'danger');

    } catch (err: unknown) {
      let message = 'Login failed due to an unexpected error.';

      if (err instanceof Error) {
        message = err.message; // Use the message from the thrown error
      } else if (typeof err === 'string') {
        message = err;
      }

      // Only show toast, do not set local error state
      // setError(message);
      showToast(message, 'danger');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 shadow rounded bg-white" style={{ minWidth: '350px' }}>
        <h4 className="mb-4 text-center">Login</h4>
        {/* Removed the conditional rendering for the error div */}
        {/* {error && <div className="alert alert-danger">{error}</div>} */}
        <form onSubmit={handleSubmit}>
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
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;