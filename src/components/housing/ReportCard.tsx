import React, { useState } from "react";
import CommentList from "./CommentList";
import AddCommentForm from "./AddCommentForm";

type Facility = {
  id: number;
  type: string;
};

type Report = {
  id: number; // This is the facilityReportId
  title: string;
  description: string;
  createDate: string;
  status: string;
  facility: Facility;
};

const ReportCard: React.FC<{ report: Report }> = ({ report }) => {
  // Local state to trigger re-render of CommentList
  const [commentVersion, setCommentVersion] = useState(0);

  const handleCommentAdded = () => {
    setCommentVersion((prev) => prev + 1); // Triggers re-render of CommentList
  };

  return (
    <div style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
      <strong>Title:</strong> {report.title}<br />
      <strong>Description:</strong> {report.description}<br />
      <strong>Facility:</strong> {report.facility.type}<br />
      <strong>Date:</strong> {new Date(report.createDate).toLocaleString()}<br />
      <strong>Status:</strong> {report.status}

      <CommentList key={commentVersion} facilityReportId={report.id} />
      <AddCommentForm
        facilityReportId={report.id}
        onCommentAdded={handleCommentAdded}
      />
    </div>
  );
};

export default ReportCard;
