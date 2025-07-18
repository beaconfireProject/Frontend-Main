import React, { useState } from "react";
import axios from "axios";

const HRAddCommentForm: React.FC<{ reportId: number; onCommentAdded: (comment: any) => void }> = ({
  reportId,
  onCommentAdded,
}) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:9000/api/housing/facility-reports/${reportId}/comments`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      onCommentAdded(res.data);
      setComment("");
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default HRAddCommentForm;
