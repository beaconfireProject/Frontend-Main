import React from 'react';
import HRNavbar from '../components/HRNavbar';

const HRHouseManagementPage: React.FC = () => (
  <>
    <HRNavbar />
    <div className="container mt-4">
      <h2>House Management</h2>
      <p>Assign and track employee housing here.</p>
    </div>
  </>
);

export default HRHouseManagementPage;
