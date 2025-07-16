import React from 'react';
import EmployeeNavbar from '../components/EmployeeNavbar';

const EmployeeHomePage: React.FC = () => {
  <>
   <EmployeeNavbar />

  </>
  return (
     <>
      <EmployeeNavbar />
        <div className="container mt-5">
      <h2>Employee Dashboard</h2>
      <p>Welcome to your dashboard.</p>
    </div>
    </>

  );
};

export default EmployeeHomePage;