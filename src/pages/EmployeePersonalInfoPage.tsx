import React, { useEffect, useState } from 'react';
import EmployeeNavbar from '../components/EmployeeNavbar';
import {type Employee }  from '../types/employeeTypes'
import { getEmployeeFromToken, deleteContact, deleteDocument } from '../services/employeeService';
import VisaView from '../components/VisaView';
import PersonalDocumentView from '../components/PersonalDocumentVIew';
import ContactView from '../components/ContactVIew';
import AddressView from '../components/AddressView';
import EmployeeInfoView from '../components/EmployeeInfoView';

const EmployeePersonalInfoPage: React.FC = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [edit, setEdit] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      const loader = await getEmployeeFromToken();
      setEmployee(loader);
    }
    void load();
  }, []);

  if(!employee) {
    return (
      <>
        <EmployeeNavbar />
        <h2>Employee Profile:</h2>
        <p>loading...</p>
      </>
    )
  }

  return (
    <>
      <EmployeeNavbar />
      <div className="container mt-5">
        <h2>Employee Profile:</h2>
        <div className="card mt-3">
          {edit ? (
            <div className="card-body">
              <h4 className="card-title">Basic Info</h4>
              <button onClick={() => setEdit(false)}>Edit</button>
              <hr></hr>
              <p><strong>Name:</strong> {employee.firstName} {employee.lastName} (preferred name: {employee.preferredName || "n/a"})</p>
              <p><strong>Email:</strong> {employee.email}</p>
              <p><strong>Phone:</strong> {employee.cellPhone} / {employee.alternatePhone}</p>
              <p><strong>Gender:</strong> {employee.gender}</p>
              <p><strong>SSN:</strong> xxx-xx-{employee.ssn.substring(7,11)}</p>
              <p><strong>DOB:</strong> {employee.dob}</p>
              <p><strong>Title:</strong> {employee.title}</p>
              <p><strong>Status:</strong> {employee.status}</p>
              <p><strong>Start Date:</strong> {employee.startDate}</p>
              <p><strong>End Date:</strong> {employee.endDate || "N/A"}</p>
              <p><strong>Driver License Number:</strong> {employee.driverLicense}</p>
              <p><strong>Drive License Expiration:</strong> {employee.driverLicenseExpiration}</p>
            </div>) :
            <EmployeeInfoView initEmployee={employee} setEdit={setEdit} setEmployee2={setEmployee}/>  
          }
        </div>
        <AddressView id={employee.id} initAddress={employee.address} />
        <ContactView id={employee.id} initContacts={employee.contact} />
        <VisaView id={employee.id} initVisas={employee.visaStatus} />
        <PersonalDocumentView id={employee.id} initDoc={employee.personalDocument} />
      </div>
    </>
  );
};

export default EmployeePersonalInfoPage;