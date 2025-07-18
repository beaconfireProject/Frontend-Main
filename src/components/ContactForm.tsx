import React, { useState } from 'react';
import { type Contact } from '../types/employeeTypes';
import { createContact } from '../services/employeeService';

type Props = {
  id: string
};

const ContactForm: React.FC<Props> = ({ id }) => {
  const [contact, setContact] = useState<Contact>({
    id: "",
    firstName: "",
    lastName: "",
    cellPhone: "",
    alternatePhone: "",
    email: "",
    relationship: "",
    type: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value ? value : "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(contact);
    createContact(id, contact);
    setContact({
      id: "",
      firstName: "",
      lastName: "",
      cellPhone: "",
      alternatePhone: "",
      email: "",
      relationship: "",
      type: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 border p-4 rounded bg-light">
      <div className="mb-3">
        <label className="form-label">First Name</label>
        <input
          type="text"
          name="firstName"
          value={contact.firstName}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={contact.lastName}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Cell Phone</label>
        <input
          type="text"
          name="cellPhone"
          value={contact.cellPhone}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Alternate Phone</label>
        <input
          type="text"
          name="alternatePhone"
          value={contact.alternatePhone}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="text"
          name="email"
          value={contact.email}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Relationship</label>
        <input
          type="text"
          name="relationship"
          value={contact.relationship}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Type</label>
        <input
          type="text"
          name="type"
          value={contact.type}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;