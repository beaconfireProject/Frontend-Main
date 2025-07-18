import React, { useState } from 'react';
import HRNavbar from '../components/HRNavbar';
import HRHouseList from '../components/hrHousing/HRHouseList';
import HRHouseDetail from '../components/hrHousing/HRHouseDetail';

const HRHouseManagementPage: React.FC = () => {
  const [selectedHouseId, setSelectedHouseId] = useState<number | null>(null);

  return (
    <>
      <HRNavbar />
      <div className="container mt-4">
        <h2>House Management</h2>

        <HRHouseList onSelectHouse={setSelectedHouseId} />

        {selectedHouseId && (
          <HRHouseDetail houseId={selectedHouseId} />
        )}
      </div>
    </>
  );
};

export default HRHouseManagementPage;
