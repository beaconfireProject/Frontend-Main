import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const buttonClass = (active: boolean) =>
    `btn btn-outline-light rounded mx-2 ${active ? 'active bg-light text-dark' : ''}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid px-3">
        <span
          className="navbar-brand"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Employee Onboarding System
        </span>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav flex-row">
            <li className="nav-item">
              <button
                className={buttonClass(isActive('/register'))}
                onClick={() => navigate('/register')}
              >
                <i className="bi bi-person-plus"></i> Register
              </button>
            </li>
            <li className="nav-item">
              <button
                className={buttonClass(isActive('/login'))}
                onClick={() => navigate('/login')}
              >
                <i className="bi bi-box-arrow-in-right"></i> Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
  