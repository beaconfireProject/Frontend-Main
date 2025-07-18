import React, { useState } from 'react';
import { type Employee } from '../types/employeeTypes';
import { putEmployee } from '../services/employeeService';

type Props = {
  initEmployee: Employee;
  setEdit: (edit: boolean) => void;
  setEmployee2: (employee : Employee) => void;
};

const EmployeeInfoView: React.FC<Props> = ({ initEmployee, setEdit, setEmployee2 }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [employee, setEmployee] = useState<Employee>(initEmployee);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setIsEditing(false);
    const response = await putEmployee(employee.id, employee);
    setEmployee(response);
    setEmployee2(response);
  };

  return (
    <div className="container mt-4">
      <h2>Employee Form</h2>

      <form className="mt-3">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">First Name</label>
            <input
              className="form-control"
              name="firstName"
              value={employee.firstName}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Last Name</label>
            <input
              className="form-control"
              name="lastName"
              value={employee.lastName}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Preferred Name</label>
            <input
              className="form-control"
              name="preferredName"
              value={employee.preferredName}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              name="email"
              value={employee.email}
              disabled={!isEditing}
              onChange={handleChange}
              type="email"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Cell Phone</label>
            <input
              className="form-control"
              name="cellPhone"
              value={employee.cellPhone}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Alternate Phone</label>
            <input
              className="form-control"
              name="alternatePhone"
              value={employee.alternatePhone}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Title</label>
            <input
              className="form-control"
              name="title"
              value={employee.title}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Status</label>
            <input
              className="form-control"
              name="status"
              value={employee.status}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Gender</label>
            <input
              className="form-control"
              name="gender"
              value={employee.gender}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              className="form-control"
              name="dob"
              value={employee.dob}
              type="date"
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">SSN</label>
            <input
              className="form-control"
              name="ssn"
              value={employee.ssn}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="text-end">
          {isEditing ? (
            <>
              <button type="button" className="btn btn-success me-2" onClick={handleSave}>
                Save
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleToggleEdit}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn btn-primary me-2" onClick={handleToggleEdit}>
                Edit
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setEdit(true)}>
                Back
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmployeeInfoView;