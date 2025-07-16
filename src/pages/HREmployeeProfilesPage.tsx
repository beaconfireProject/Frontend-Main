import React from 'react';
import HRNavbar from '../components/HRNavbar';

const HREmployeeProfilesPage: React.FC = () => (
  <>
    <HRNavbar />
    <div className="container mt-4">
      <h2>Employee Profiles</h2>
      <p>View and manage employee data here.</p>
    </div>
  </>
);

export default HREmployeeProfilesPage;
