import React from 'react';

type Occupant = {
  name: string;
  phone: string;
};

type Props = {
  address: string;
  occupants?: Occupant[];
};

const AssignedHouseInfo: React.FC<Props> = ({ address, occupants }) => {
  return (
    <div className="mb-4">
      <h3>Your Assigned House</h3>
      <p><strong>Address:</strong> {address}</p>
      <h4>Employees:</h4>
      <ul>
        {(occupants ?? []).map((emp, index) => (
          <li key={index}>{emp.name} – {emp.phone}</li>
        ))}
      </ul>
    </div>
  );
};

export default AssignedHouseInfo;