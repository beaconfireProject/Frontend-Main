import React, { useEffect, useState } from 'react';
import EmployeeNavbar from '../components/EmployeeNavbar';
import { getEmployeeFromToken } from '../services/employeeService';
import { getStatus } from '../services/applicationService';
import OnboardingNavbar from '../components/OnboardingNavbar';

const EmployeeHomePage: React.FC = () => {
  const [isApproved, setIsApproved] = useState<boolean | null>(null);
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const employee = await getEmployeeFromToken();
        console.log(employee);
        const statusRes = await getStatus(employee.id);
        const status = statusRes.status;

        if (status === "Completed" || status === "Approved") {
          setIsApproved(true);
        } else {
          setIsApproved(false);
        }
      } catch (error) {
        console.error("Failed to check employee or status:", error);
        setIsApproved(false);
      }
    };

    checkStatus();
  }, []);
  if (isApproved === null) {
    return (
      <div className="container mt-5">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!isApproved) {
    return (
      <>
        <OnboardingNavbar />
        <div className="container mt-5">
          <h2>Waiting for HR to approve</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <EmployeeNavbar />
      <div className="container mt-5">
        <h2>Employee Dashboard</h2>
        <p>Welcome to your dashboard.</p>
      </div>
    </>
  );
};

export default EmployeeHomePage;