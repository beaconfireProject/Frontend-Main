import React, { useEffect, useState } from 'react';
import HRNavbar from '../components/HRNavbar';
import { getApplicationDetailById, updateStatus, type ApplicationDetail } from '../services/applicationService';
import { useParams } from 'react-router-dom';
import { putEmployee } from '../services/employeeService';

const ApplicationDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [applicationDetail, setApplicationDetail] = useState<ApplicationDetail>();
    const [showModal, setShowModal] = useState(false);
    const [changeStatus, setChangeStatus] = useState(false);
    const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
    const [comment, setComment] = useState('');

    useEffect(() => {
        getApplicationDetailById(parseInt(id)).then((response) => {
          console.log(response);
          setApplicationDetail(response);
          })
          .catch((error) => {
            console.error('Failed to fetch application detail:', error);
          });
    }, []);

    const handleSubmitComment = async () => {
        try {
            if (changeStatus) {
                const updateS =await updateStatus(applicationDetail?.applicationWorkFlow.id, "Rejected", comment);
             } else {
                const updatedDocuments = applicationDetail?.employee.personalDocument.map((doc) =>
                    doc.id === selectedDocId ? { ...doc, comment: comment } : doc
                );
                const update = await putEmployee(applicationDetail?.employee.id, {
                    ...applicationDetail?.employee,
                    personalDocument: updatedDocuments
                });
            }
            setShowModal(false);
            setChangeStatus(false);
            setComment('');
            window.location.reload(); // or re-fetch data
        } catch (error) {
            console.error("Failed to update comment", error);
        }
    };
    
    

    async function handleApprove(): Promise<void> {
        try { 
            const update = await updateStatus(applicationDetail?.applicationWorkFlow.id, "Approved", "");
            setComment('');
            window.location.reload();
        } catch (error) {
            console.error("Failed to update comment", error);
            window.alert("Status already exists or completed");
        }
    }

    function handleReject(): void {
        setShowModal(true);
        setChangeStatus(true);
    }

    return (
        <>
            <HRNavbar /><br /><br />
            <button
                className="btn btn-primary btn-sm"
                onClick={() => handleApprove()}
            >Approve</button><br /><br />
            <button
                className="btn btn-primary btn-sm"
                onClick={() => handleReject()}
            >Reject</button>
            <div className="container mt-5">
                <h2>Application Detail</h2>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{applicationDetail?.applicationWorkFlow.id}</td>
                        </tr>
                        <tr>
                            <th>Employee ID</th>
                            <td>{applicationDetail?.applicationWorkFlow.employeeId}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>{applicationDetail?.applicationWorkFlow.status}</td>
                        </tr>
                        <tr>
                            <th>Comment</th>
                            <td>{applicationDetail?.applicationWorkFlow.comment}</td>
                        </tr>
                        <tr>
                            <th>Application Type</th>
                            <td>{applicationDetail?.applicationWorkFlow.applicationType}</td>
                        </tr>
                        <tr>
                            <th>Created At</th>
                            <td>{applicationDetail?.applicationWorkFlow.createdAt}</td>
                        </tr>
                        <tr>
                            <th>Updated At</th>
                            <td>{applicationDetail?.applicationWorkFlow.updatedAt}</td>
                        </tr>
                    </tbody>
                </table>
                <h2>Employee Info</h2>
                <p>firstName: {applicationDetail?.employee.firstName}</p>
                <p>lastName: {applicationDetail?.employee.lastName}</p>
                <p>preferredName: {applicationDetail?.employee.preferredName}</p>
                <p>email: {applicationDetail?.employee.email}</p>
                <p>cellPhone: {applicationDetail?.employee.cellPhone}</p>
                <p>alternatePhone: {applicationDetail?.employee.alternatePhone}</p>
                <p>gender: {applicationDetail?.employee.gender}</p>
                <p>ssn: {applicationDetail?.employee.ssn}</p>
                <p>dob: {applicationDetail?.employee.dob}</p>
                <p>startDate: {applicationDetail?.employee.startDate}</p>
                <p>endDate: {applicationDetail?.employee.endDate}</p>
                <p>driverLicense: {applicationDetail?.employee.driverLicense}</p>
                <p>driverLicenseExpiration: {applicationDetail?.employee.driverLicenseExpiration}</p>
                <p>houseId: {applicationDetail?.employee.houseId}</p>
                <p>status: {applicationDetail?.employee.status}</p>
                <p>title: {applicationDetail?.employee.title}</p>
                <p>comment: {applicationDetail?.employee.comment}</p>

                <h4>Contact Info</h4>
                {applicationDetail?.employee.contact.map((c, index) => (
                    <div key={index}>
                        <p>First Name: {c.firstName}</p>
                        <p>Last Name: {c.lastName}</p>
                        <p>Phone: {c.cellPhone}</p>
                        <p>alternatePhone: { c.alternatePhone}</p>
                        <p>Email: {c.email}</p>
                        <p>Relationship: {c.relationship}</p>
                        <hr />
                    </div>
                ))}

                {/* Address info */}
                <h4>Addresses</h4>
                {applicationDetail?.employee.address.map((a, index) => (
                    <div key={index}>
                        <p>addressLine1: {a.addressLine1}</p>
                        <p>addressLine2: {a.addressLine2}</p>
                        <p>City: {a.city}</p>
                        <p>State: {a.state}</p>
                        <p>Zip Code: {a.zipCode}</p>
                        <hr />
                    </div>
                ))}

                { /* adsc*/}
                <h4>Personal document</h4>
                {applicationDetail?.employee.personalDocument.map((d, index) => {
                    function handleEdit(): void {
                        setSelectedDocId(d.id);
                        setShowModal(true);
                    }

                    return (<div key={index}>
                        <p>Title: {d.title}</p>
                        <p>Comment: {d.comment}</p>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleEdit()}
                        >Edit</button>
                        <p>CreateDate: {d.createDate}</p>
                        <p>Path: {d.path}</p>
                        <hr />
                    </div>
                    );
                })}

                {showModal && (
                    <div className="modal-backdrop show">
                        <div
                            className="modal d-block"
                            tabIndex={-1}
                            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Edit Comment</h5>
                                        <button className="btn-close" onClick={() => setShowModal(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <textarea
                                            className="form-control"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Enter new comment"
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                        <button className="btn btn-primary" onClick={handleSubmitComment}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}

export default ApplicationDetailPage;