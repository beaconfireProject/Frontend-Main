import React, { useState } from 'react';
import { type VisaStatus } from '../types/employeeTypes';
import { createVisa } from '../services/employeeService';

type Props = {
  id: string
};

const VisaForm: React.FC<Props> = ({ id }) => {
  const [visa, setVisa] = useState<VisaStatus>({
    id: "",
    visaType: "",
    activeFlag: true,
    startDate: "",
    endDate: "",
    lastModificationDate: new Date().toISOString().split("T")[0], // today's date
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setVisa({
      ...visa,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(visa);
    if(visa.startDate==="" || visa.endDate==="" || visa.visaType==="") {
      return;
    }
    createVisa(id, visa);
    setVisa({
      id:"",
      visaType: "",
      activeFlag: true,
      startDate: "",
      endDate: "",
      lastModificationDate: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 border p-4 rounded bg-light">
      <div>
        <h5>Add Active Visa</h5>
        <label className="form-label">Visa Type</label>
        <select
          name="visaType"
          value={visa.visaType}
          onChange={handleChange}
          className="form-select"
          required
        >
          <option value="">Select Type</option>
          <option value="H1B">H1B</option>
          <option value="F1">F1</option>
          <option value="OPT">OPT</option>
          <option value="L1">L1</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={visa.startDate}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">End Date</label>
        <input
          type="date"
          name="endDate"
          value={visa.endDate}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      {/* <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          name="activeFlag"
          checked={visa.activeFlag}
          onChange={handleChange}
          id="activeFlag"
        />
        <label className="form-check-label" htmlFor="activeFlag">
          Active
        </label>
      </div> */}

      <button type="submit" className="btn btn-primary">
        Add Visa
      </button>
    </form>
  );
};

export default VisaForm;