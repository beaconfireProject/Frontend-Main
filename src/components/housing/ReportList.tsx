import React, { useEffect, useState } from "react";
import axios from "axios";
import ReportCard from "./ReportCard";

type Facility = {
  id: number;
  type: string;
};

type Report = {
  id: number;
  title: string;
  description: string;
  createDate: string;
  status: string;
  facility: Facility;
};

interface ReportListProps {
  version: number;
}

const ReportList: React.FC<ReportListProps> = ({ version }) => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:9000/api/housing/facility-report", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setReports(res.data);
      })
      .catch((err) => {
        console.error("Error fetching reports:", err);
      });
  }, [version]);

  return (
    <div style={{ margin: "20px" }}>
      <h2>Submitted Reports</h2>
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))
      )}
    </div>
  );
};

export default ReportList;
