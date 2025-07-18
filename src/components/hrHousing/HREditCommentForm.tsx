import React, { useState } from "react";
import axios from "axios";

type EditCommentFormProps = {
  comment: {
    id: number;
    comment: string;
  };
  reportId: number;
  onCancel: () => void;
  onUpdated: (updatedComment: any) => void;
};

const HREditCommentForm: React.FC<EditCommentFormProps> = ({
  comment,
  onCancel,
  onUpdated,
}) => {
  const [editedComment, setEditedComment] = useState(comment.comment);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!editedComment.trim()) return;

    setLoading(true);
    try {
      await axios.put(
        `http://localhost:9000/api/housing/facility-reports/comments/${comment.id}`,
        { description: editedComment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      onUpdated({
        id: comment.id,
        comment: editedComment,
        lastModificationDate: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Failed to update comment", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "8px" }}>
      <textarea
        rows={3}
        value={editedComment}
        onChange={(e) => setEditedComment(e.target.value)}
        disabled={loading}
      />
      <br />
      <button onClick={handleUpdate} disabled={loading}>
        Save
      </button>
      <button onClick={onCancel} style={{ marginLeft: "8px" }}>
        Cancel
      </button>
    </div>
  );
};

export default HREditCommentForm;
