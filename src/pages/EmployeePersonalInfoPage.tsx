import React from 'react';
import EmployeeNavbar from '../components/EmployeeNavbar';

const EmployeePersonalInfoPage: React.FC = () => {
  return (
    <>
      <EmployeeNavbar />
     <div className="container mt-5">
      <h2>Personal Information</h2>
      <p>This page will display and allow updates to your personal info.</p>
    </div>
    </>
  );
};

export default EmployeePersonalInfoPage;