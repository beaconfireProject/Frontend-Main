import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeNavbar from "../components/EmployeeNavbar";
import AssignedHouseInfo from "../components/housing/AssignedHouseInfo";
import ReportForm from "../components/housing/ReportForm";
import ReportList from "../components/housing/ReportList";

type Occupant = {
  name: string;
  phone: string;
};

type House = {
  houseId: number;
  address: string;
  occupants: Occupant[];
};

type Facility = {
  id: number;
  type: string;
  description: string;
  houseId: number;
};

const Housing: React.FC = () => {
  const [house, setHouse] = useState<House | null>(null);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [reportVersion, setReportVersion] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Using token:", token);

    axios
      .get("http://localhost:9000/api/housing/assigned", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Fetched house:", res.data);
        setHouse(res.data);

        return axios.get(`http://localhost:9000/api/housing/facilities`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then((res) => {
        console.log("Fetched facilities:", res.data);
        setFacilities(res.data);
      })
      .catch((err) => {
        console.error("Error fetching house/facilities:", err);
      });
  }, []);

  const handleSubmitReport = (
    title: string,
    description: string,
    facilityId: number
  ) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:9000/api/housing/facility-report",
        {
          title,
          description,
          facilityId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log("Report submitted:", res.data);
        setReportVersion((v) => v + 1);
      })
      .catch((err) => {
        console.error("Failed to submit report:", err);
      });
  };

  return (
    <>
      <EmployeeNavbar />
      {house ? (
        <>
          <AssignedHouseInfo
            address={house.address}
            occupants={house.occupants}
          />
          {facilities.length > 0 ? (
            <ReportForm facilities={facilities} onSubmit={handleSubmitReport} />
          ) : (
            <p>Loading facilities...</p>
          )}
          <ReportList version={reportVersion}/>
        </>
      ) : (
        <p>Loading housing data...</p>
      )}
    </>
  );
};

export default Housing;
