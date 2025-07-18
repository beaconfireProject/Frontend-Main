import React, { useState } from "react";
import axios from "axios";

interface AddCommentFormProps {
  facilityReportId: number;
  onCommentAdded: () => void;
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({
  facilityReportId,
  onCommentAdded,
}) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios
      .post(
        `http://localhost:9000/api/housing/facility-report/${facilityReportId}/comment`,
        { comment },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setComment("");
        onCommentAdded(); // To refresh the list after adding
      })
      .catch((err) => {
        console.error("Failed to add comment:", err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        rows={3}
        style={{ width: "100%" }}
      />
      <button type="submit">Submit Comment</button>
    </form>
  );
};

export default AddCommentForm;
