import React, { useState } from 'react';
import { type Employee, type Contact } from '../types/employeeTypes';
import ContactForm from './ContactForm'
import { deleteContact } from '../services/employeeService';

type Props = {
  id: string;
  initContacts: Contact[];
};

const ContactView: React.FC<Props> = ({id, initContacts}) => {
  const [edit, setEdit] = useState<boolean>(true);
  const [contacts, setContacts] = useState<Contact[]>(initContacts);
  const removeHandler = async (docId: string) => {
    const employee : Employee = await deleteContact(id, docId);
    setContacts(employee.contact);
  }
  return (
    <div className="card mt-3">
      <div className="card-body">
        <h4 className="card-title">Contacts</h4>
        {edit ?
          <button onClick={() => setEdit(false)}>Add Contact</button>
          :
          <button onClick={() => setEdit(true)}>Cancel</button>
        }
        <hr></hr>
        {edit ? 
          contacts.map((c, i) => (
            <div key={i} className="mb-2">
              <p><strong>Name:</strong> {c.firstName} {c.lastName}</p>
              <p><strong>Relationship:</strong> {c.relationship}</p>
              <p><strong>Phone:</strong> {c.cellPhone} / {c.alternatePhone}</p>
              <p><strong>Email:</strong> {c.email}</p>
              <p><strong>Type:</strong> {c.type || "N/A"}</p>
              <button onClick={() => removeHandler(c.id)}>Remove</button>
              <hr ></hr>
            </div>)
          ) :
          (
            <ContactForm id={id} />
          )
        }
      </div>
    </div>
  )
}

export default ContactView;