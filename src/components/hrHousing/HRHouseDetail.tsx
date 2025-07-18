import React, { useEffect, useState } from "react";
import axios from "axios";
import HRFacilityReportTable from "./HRFacilityReportTable";

type Landlord = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

type HouseDetail = {
  houseId: number;
  address: string;
  landlord: Landlord;
  numEmployees: number;
  employees: string[];
  facilities: Record<string, number>;
};

const HRHouseDetail: React.FC<{ houseId: number }> = ({ houseId }) => {
  const [house, setHouse] = useState<HouseDetail | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/housing/${houseId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setHouse(res.data))
      .catch((err) => console.error("Failed to fetch house details:", err));
  }, [houseId]);

  if (!house) return <div>Loading house details...</div>;

  return (
    <div>
      <h3>{house.address}</h3>
      <p>Landlord: {house.landlord.firstName} {house.landlord.lastName}</p>
      <p>Phone: {house.landlord.phone}</p>
      <p>Email: {house.landlord.email}</p>
      <h4>Facilities</h4>
      <ul>
        {Object.entries(house.facilities).map(([facility, qty]) => (
          <li key={facility}>{facility}: {qty}</li>
        ))}
      </ul>

      <HRFacilityReportTable houseId={house.houseId} />
    </div>
  );
};

export default HRHouseDetail;
