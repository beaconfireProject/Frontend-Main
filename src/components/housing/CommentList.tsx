import React, { useEffect, useState } from "react";
import axios from "axios";

interface Comment {
  id: number; // facilityReportDetailId
  comment: string;
  createdBy: string | null; // null for HR
  createDate: string;
  lastModifiedDate?: string;
}

interface CommentListProps {
  facilityReportId: number;
}

const CommentList: React.FC<CommentListProps> = ({ facilityReportId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");

  const fetchComments = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:9000/api/housing/facility-report/${facilityReportId}/comments`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setComments(res.data))
      .catch((err) => console.error("Failed to fetch comments:", err));
  };

  useEffect(() => {
    fetchComments();
  }, [facilityReportId]);

  const handleEdit = (commentId: number, original: string) => {
    setEditingCommentId(commentId);
    setEditedText(original);
  };

  const handleSave = (commentId: number) => {
    const token = localStorage.getItem("token");

    axios
      .put(
        `http://localhost:9000/api/housing/facility-report/comment/${commentId}`,
        { comment: editedText },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setEditingCommentId(null);
        fetchComments();
      })
      .catch((err) => console.error("Failed to update comment:", err));
  };

  return (
    <div>
      <h4>Comments</h4>
      {comments.map((c) => {
        const isHR = c.createdBy === null;

        return (
          <div key={c.id} style={{ marginBottom: "10px" }}>
            <strong>{isHR ? "HR" : "Employee"}</strong>{" "}
            - <em>{c.lastModifiedDate || c.createDate}</em>
            <div>
              {editingCommentId === c.id ? (
                <>
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <button onClick={() => handleSave(c.id)}>Save</button>
                </>
              ) : (
                <>
                  <p>{c.comment}</p>
                  {!isHR && (
                    <button onClick={() => handleEdit(c.id, c.comment)}>Edit</button>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
