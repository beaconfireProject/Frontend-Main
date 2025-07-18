import React, { useEffect, useState } from "react";
import axios from "axios";
import HRAddCommentForm from "./HRAddCommentForm";
import HREditCommentForm from "./HREditCommentForm";

type Report = {
  id: number;
  title: string;
  description: string;
  createDate: string;
  status: string;
  reporterName: string;
  employeeId: string;
  facility: {
    type: string;
    description: string;
    quantity: number;
  };
};

type Comment = {
  id: number;
  comment: string;
  createDate: string;
  lastModificationDate?: string;
  employeeId: string;
};

const HRReportDetailModal: React.FC<{
  report: Report;
  onClose: () => void;
}> = ({ report, onClose }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [status, setStatus] = useState<string>(report.status);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/housing/facility-report/${report.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setComments(res.data))
      .catch((err) => console.error("Failed to load comments", err));
  }, [report.id]);

  const handleStatusUpdate = () => {
    setUpdatingStatus(true);
    setStatusMessage(null);

    axios
      .put(
        `http://localhost:9000/api/housing/facility-reports/${report.id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setStatusMessage("Status updated.");
      })
      .catch((error) => {
        console.error("Failed to update status", error);
        setStatusMessage("Failed to update status.");
      })
      .finally(() => {
        setUpdatingStatus(false);
      });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "12px",
          width: "500px",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h2>{report.title}</h2>
        <p>{report.description}</p>
        <p>
          <strong>Reported By:</strong> {report.reporterName} ({report.employeeId})
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>Facility: {report.facility.type}</p>
        <p>Created on: {report.createDate}</p>

        <div style={{ marginTop: "12px" }}>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={updatingStatus}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
          <button
            onClick={handleStatusUpdate}
            disabled={updatingStatus}
            style={{ marginLeft: "8px" }}
          >
            Update Status
          </button>
          {statusMessage && (
            <p
              style={{
                color: statusMessage.includes("Failed") ? "red" : "green",
                marginTop: "8px",
              }}
            >
              {statusMessage}
            </p>
          )}
        </div>

        <hr />
        <h3>Comments</h3>
        <ul>
          {comments.map((c) => (
            <li key={c.id} style={{ marginBottom: "12px" }}>
              <strong>{c.employeeId ? report.reporterName : "HR"}:</strong>{" "}
              {editingCommentId === c.id ? (
                <HREditCommentForm
                  comment={c}
                  reportId={report.id}
                  onCancel={() => setEditingCommentId(null)}
                  onUpdated={(updated) => {
                    setComments((prev) =>
                      prev.map((comment) =>
                        comment.id === updated.id
                          ? {
                              ...comment,
                              comment: updated.comment,
                              lastModificationDate: updated.lastModificationDate,
                            }
                          : comment
                      )
                    );
                    setEditingCommentId(null);
                  }}
                />
              ) : (
                <>
                  {c.comment}{" "}
                  <small>
                    ({c.lastModificationDate ? c.lastModificationDate : c.createDate})
                  </small>
                  {!c.employeeId && (
                    <button
                      onClick={() => setEditingCommentId(c.id)}
                      style={{ marginLeft: "8px" }}
                    >
                      Edit
                    </button>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>

        <HRAddCommentForm
          reportId={report.id}
          onCommentAdded={(newComment) =>
            setComments((prev) => [...prev, newComment])
          }
        />

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default HRReportDetailModal;
