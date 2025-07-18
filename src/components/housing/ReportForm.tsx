import React, { useState } from "react";

type Facility = {
  id: number;
  type: string;
  description: string;
  houseId: number;
};

type ReportFormProps = {
  facilities: Facility[]; // we assume this is always passed, even if empty
  onSubmit: (title: string, description: string, facilityId: number) => void;
};

const ReportForm: React.FC<ReportFormProps> = ({ facilities = [], onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFacilityId, setSelectedFacilityId] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFacilityId === "") {
      alert("Please select a facility.");
      return;
    }
    onSubmit(title, description, Number(selectedFacilityId));
    setTitle("");
    setDescription("");
    setSelectedFacilityId("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "20px" }}>
      <h2>Submit a Facility Report</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
        required
      />
      <select
        value={selectedFacilityId}
        onChange={(e) => setSelectedFacilityId(Number(e.target.value))}
        style={{ width: "100%", marginBottom: "10px" }}
        required
      >
        <option value="">Select a facility</option>
        {facilities.map((f) => (
          <option key={f.id} value={f.id}>
            {f.type}
          </option>
        ))}
      </select>
      <button type="submit">Submit Report</button>
    </form>
  );
};

export default ReportForm;
