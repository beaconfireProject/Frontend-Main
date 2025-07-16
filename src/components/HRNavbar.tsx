import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const HRNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
          HR Portal
        </span>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav flex-row align-items-center">
            <li className="nav-item">
              <button
                className={buttonClass(isActive('/hr/dashboard'))}
                onClick={() => navigate('/hr/dashboard')}
              >
                <i className="bi bi-house me-1"></i> Home
              </button>
            </li>
            <li className="nav-item">
              <button
                className={buttonClass(isActive('/hr/employees'))}
                onClick={() => navigate('/hr/employees')}
              >
                <i className="bi bi-person-badge me-1"></i> Employee Profiles
              </button>
            </li>
            <li className="nav-item">
              <button
                className={buttonClass(isActive('/hr/visa'))}
                onClick={() => navigate('/hr/visa')}
              >
                <i className="bi bi-pass me-1"></i> Visa Management
              </button>
            </li>
            <li className="nav-item">
              <button
                className={buttonClass(isActive('/hr/hiring'))}
                onClick={() => navigate('/hr/hiring')}
              >
                <i className="bi bi-clipboard-check me-1"></i> Hiring Management
              </button>
            </li>
            <li className="nav-item">
              <button
                className={buttonClass(isActive('/hr/housing'))}
                onClick={() => navigate('/hr/housing')}
              >
                <i className="bi bi-building me-1"></i> House Management
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

export default HRNavbar;
