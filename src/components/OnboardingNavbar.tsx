import React from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingNavbar: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <span
        className="navbar-brand fw-bold"
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/employee/onboarding')}
      >
        Onboarding
      </span>
      <div className="ms-auto d-flex align-items-center gap-2">
        {/* Optional slot for info or component */}
        {/* Example: <EmployeeOnboardingPage /> if you wish to place it inline */}
        
        <button className="btn btn-outline-light rounded" onClick={handleSignOut}>
          <i className="bi bi-box-arrow-right me-1"></i> Sign Out
        </button>
      </div>
    </nav>
  );
};

export default OnboardingNavbar;
