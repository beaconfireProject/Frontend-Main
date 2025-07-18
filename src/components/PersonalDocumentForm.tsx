import React, { useState } from 'react';
import { type PersonalDocument } from '../types/employeeTypes';
import { createDocument } from '../services/employeeService';

type Props = {
  id: string
};

const PersonalDocumentForm: React.FC<Props> = ({ id }) => {
  const [document, setDocument] = useState<PersonalDocument>({
    id: "",
    path: "",
    title: "",
    comment: "",
    createDate: new Date().toISOString().split("T")[0]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDocument({
      ...document,
      [name]: value ? value : "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(document);
    createDocument(id, document);
    setDocument({
      id: "",
      path: "",
      title: "",
      comment: "",
      createDate: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 border p-4 rounded bg-light">
      <div className="mb-3">
        <label className="form-label">Path</label>
        <input
          type="text"
          name="path"
          value={document.path}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          value={document.title}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Comment</label>
        <input
          type="text"
          name="comment"
          value={document.comment}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Date</label>
        <input
          type="date"
          name="date"
          value={document.createDate}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add Document
      </button>
    </form>
  );
};

export default PersonalDocumentForm;