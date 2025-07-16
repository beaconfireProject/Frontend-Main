import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EmployeeNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showVisaTab] = useState(true); // Hardcoded for now

  const isActive = (path: string) => location.pathname === path;

  const buttonClass = (active: boolean) =>
    `btn btn-outline-light rounded mx-2 ${active ? 'active bg-light text-dark' : ''}`;

  const signOutClass = 'btn btn-outline-warning rounded mx-2';

  const signOut = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid px-3">
        <span className="navbar-brand" style={{ cursor: 'default' }}>
          Employee Portal
        </span>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav flex-row align-items-center">
            <li className="nav-item">
              <button
                className={buttonClass(isActive('/employee/home'))}
                onClick={() => navigate('/employee/home')}
              >
                <i className="bi bi-house me-1"></i> Home
              </button>
            </li>
            <li className="nav-item">
              <button
                className={buttonClass(isActive('/employee/personal-info'))}
                onClick={() => navigate('/employee/personal-info')}
              >
                <i className="bi bi-person me-1"></i> Personal Info
              </button>
            </li>
            {showVisaTab && (
              <li className="nav-item">
                <button
                  className={buttonClass(isActive('/employee/visa-status'))}
                  onClick={() => navigate('/employee/visa-status')}
                >
                  <i className="bi bi-pass me-1"></i> Visa Status
                </button>
              </li>
            )}
            <li className="nav-item">
              <button
                className={buttonClass(isActive('/employee/housing'))}
                onClick={() => navigate('/employee/housing')}
              >
                <i className="bi bi-building me-1"></i> Housing
              </button>
            </li>
            <li className="nav-item">
              <button className={signOutClass} onClick={signOut}>
                <i className="bi bi-box-arrow-right me-1"></i> Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default EmployeeNavbar;