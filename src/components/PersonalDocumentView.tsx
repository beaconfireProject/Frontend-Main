import React, { useState } from 'react';
import { type Employee, type PersonalDocument } from '../types/employeeTypes';
import PersonalDocumentForm from './PersonalDocumentForm';
import { deleteDocument } from '../services/employeeService';

type Props = {
  id: string;
  initDoc: PersonalDocument[];
};

const PersonalDocumentView: React.FC<Props> = ({id, initDoc}) => {
  const [edit, setEdit] = useState<boolean>(true);
  const [docs, setDocs] = useState<PersonalDocument[]>(initDoc);
  const removeHandler = async (docId: string) => {
    const employee : Employee = await deleteDocument(id, docId);
    setDocs(employee.personalDocument);
  }
  return (
    <div className="card mt-3">
      <div className="card-body">
        <h4 className="card-title">Personal Documents</h4>
        {edit ?
          <button onClick={() => setEdit(false)}>Add Document</button>
          :
          <button onClick={() => setEdit(true)}>Cancel</button>
        }
        <hr></hr>
        {edit ? 
          docs.map((doc, i) => (
            <div key={i} className="mb-2">
              <p><strong>Title: </strong>{doc.title}</p>
              <p><strong>Comment: </strong>{doc.comment}</p>
              <p><strong>Date: </strong>{doc.createDate}</p>
              <p><strong>Link: </strong>{doc.path}</p>
              <button onClick={() => removeHandler(doc.id)}>Remove</button>
              <hr></hr>
            </div>
          )) :
          (
            <PersonalDocumentForm id={id} />
          )
        }
      </div>
    </div>
  )
}

export default PersonalDocumentView;