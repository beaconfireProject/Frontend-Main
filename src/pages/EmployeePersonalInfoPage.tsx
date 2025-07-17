import React from 'react';
import EmployeeNavbar from '../components/EmployeeNavbar';
import {type Employee, type Document, type VisaStatus, type Contact, type Address}  from '../types/employeeTypes'

// mock data
const employee : Employee = 
{
    "id": "e1001",
    "userId": 1,
    "firstName": "john",
    "lastName": "Doe",
    "preferredName": "johnny",
    "email": "john.doe@example.com",
    "cellPhone": "123-456-7890",
    "alternatePhone": "987-654-3210",
    "gender": "male",
    "ssn": "123-45-6789",
    "dob": "1990-05-14",
    "startDate": "2022-05-31",
    "endDate": "",
    "driverLicense": "D1234567",
    "driverLicenseExpiration": "2030-05-31",
    "houseId": 1,
    "status": "active",
    "title": "software engineer",
    "comment": "no issues",
    "contact": [
        {
            "id": "",
            "firstName": "jane",
            "lastName": "doe",
            "cellPhone": "555-111-2222",
            "alternatePhone": "555-333-4444",
            "email": "jane.doe@example.com",
            "relationship": "spouse",
            "type": "emergency"
        },
        {
            "id": "514986451",
            "firstName": "Fiona",
            "lastName": "Chen",
            "cellPhone": "555-999-1010",
            "alternatePhone": "555-888-1010",
            "email": "fiona.chen@example.com",
            "relationship": "sister",
            "type": ""
        }
    ],
    "address": [
        {
            "id": "",
            "addressLine1": "123 Main St",
            "addressLine2": "Apt 4B",
            "city": "Seattle",
            "state": "WA",
            "zipCode": "98101"
        }
    ],
    "visaStatus": [
        {
            "id": "",
            "visaType": "H1B",
            "activeFlag": true,
            "startDate": "2021-12-31",
            "endDate": "2024-12-31",
            "lastModificationDate": "2024-05-31"
        },
        {
            "id": "598816721",
            "visaType": "H1B",
            "activeFlag": true,
            "startDate": "2022-01-01",
            "endDate": "2025-01-01",
            "lastModificationDate": "2024-06-01"
        }
    ],
    "personalDocument": [
        {
            "id": "",
            "path": "/docs/passport-john.pdf",
            "title": "passport",
            "comment": "scanned copy",
            "createDate": "2022-05-19"
        },
        {
            "id": "512490956",
            "path": "/docs/passport-john2.pdf",
            "title": "passport2",
            "comment": "scanned copy2",
            "createDate": "2022-05-19"
        },
        {
            "id": "689478503",
            "path": "/docs/passport-john2.pdf",
            "title": "passport2",
            "comment": "scanned copy2",
            "createDate": "2022-05-20"
        }
    ]
}

const EmployeePersonalInfoPage: React.FC = () => {
  return (
    <>
      <EmployeeNavbar />
      <div className="container mt-5">
        <h2>Employee Profile:</h2>
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">Basic Info</h5>
            <p><strong>Name:</strong> {employee.firstName} {employee.lastName} ({employee.preferredName})</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Phone:</strong> {employee.cellPhone} / {employee.alternatePhone}</p>
            <p><strong>Gender:</strong> {employee.gender}</p>
            <p><strong>SSN:</strong> {employee.ssn}</p>
            <p><strong>DOB:</strong> {employee.dob}</p>
            <p><strong>Title:</strong> {employee.title}</p>
            <p><strong>Status:</strong> {employee.status}</p>
            <p><strong>Start Date:</strong> {employee.startDate}</p>
            <p><strong>End Date:</strong> {employee.endDate || "N/A"}</p>
            <p><strong>Driver License Number:</strong> {employee.driverLicense}</p>
            <p><strong>Drive License Expiration:</strong> {employee.driverLicenseExpiration}</p>
          </div>
        </div>

        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">Address</h5>
            {employee.address.map((addr, i) => (
              <div key={i}>
                <p>{addr.addressLine1}, {addr.addressLine2}</p>
                <p>{addr.city}, {addr.state} {addr.zipCode}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">Emergency Contacts</h5>
            {employee.contact.map((c, i) => (
              <div key={i} className="mb-2">
                <p><strong>{c.relationship}</strong>: {c.firstName} {c.lastName}</p>
                <p>Phone: {c.cellPhone} / {c.alternatePhone}</p>
                <p>Email: {c.email}</p>
                <p>Type: {c.type || "N/A"}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">Visa Status</h5>
            {employee.visaStatus.map((visa, i) => (
              <div key={i} className="mb-2">
                <p><strong>Type:</strong> {visa.visaType}</p>
                <p>Active: {visa.activeFlag ? "Yes" : "No"}</p>
                <p>From: {visa.startDate} to {visa.endDate}</p>
                <p>Last Updated: {visa.lastModificationDate}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card mt-3 mb-4">
          <div className="card-body">
            <h5 className="card-title">Personal Documents</h5>
            {employee.personalDocument.map((doc, i) => (
              <div key={i} className="mb-2">
                <p><strong>{doc.title}</strong> - {doc.comment}</p>
                <p>Date: {doc.createDate}</p>
                <a href={doc.path} target="_blank" rel="noopener noreferrer">View Document</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeePersonalInfoPage;