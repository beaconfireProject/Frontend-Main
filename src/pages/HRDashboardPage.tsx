import React from 'react';
import HRNavbar from '../components/HRNavbar';

const HRDashboardPage: React.FC = () => {
  return (
    <>
      <HRNavbar />
      <div className="container mt-5">
        <h2> HR Dashboard Page</h2>
        <p>Welcome HR! This is your dashboard overview.</p>
      </div>
    </>
  );
};

export default HRDashboardPage;
