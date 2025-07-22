import React, { useEffect, useState } from 'react';
import HRNavbar from '../components/HRNavbar';
import { getAllONgoingApplications } from '../services/applicationService';
import { useNavigate } from 'react-router-dom';

interface Application {
  id: number;
  employeeId: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  comment: string;
  applicationType: string;
}

const HRDashboardPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllONgoingApplications().then((response) => {
      console.log(response);
      setApplications(response);
      })
      .catch((error) => {
        console.error('Failed to fetch applications:', error);
      });
  }, []);

  const handleEdit = (applicationId: number) => {
    console.log(`Edit application ID: ${applicationId}`);
    navigate(`/application/detail/${applicationId}`);
  };

  return (
    <>
      <HRNavbar />
      <div className="container mt-5">
        <h2>HR Dashboard Page</h2>
        <p>Welcome HR! This is your dashboard overview.</p>

        <table className="table table-bordered mt-4">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Employee ID</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Status</th>
              <th>Comment</th>
              <th>Application Type</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.employeeId}</td>
                <td>{new Date(app.createdAt).toLocaleString()}</td>
                <td>{new Date(app.updatedAt).toLocaleString()}</td>
                <td>{app.status}</td>
                <td>{app.comment}</td>
                <td>{app.applicationType}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(app.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HRDashboardPage;