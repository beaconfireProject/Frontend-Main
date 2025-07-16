import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import RoleGuard from '../guards/RoleGuard';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

// Employee pages
import EmployeeOnboardingPage from '../pages/EmployeeOnboardingPage';
import EmployeeHomePage from '../pages/EmployeeHomePage';
import EmployeePersonalInfoPage from '../pages/EmployeePersonalInfoPage';
import VisaStatus from '../pages/VisaStatus';
import Housing from '../pages/Housing';

// HR pages
import HRDashboardPage from '../pages/HRDashboardPage';
import HREmployeeProfilesPage from '../pages/HREmployeeProfilesPage';
import HRVisaManagementPage from '../pages/HRVisaManagementPage';
import HRHiringManagementPage from '../pages/HRHiringManagementPage';
import HRHouseManagementPage from '../pages/HRHouseManagementPage';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Employee routes protected by AuthGuard and RoleGuard */}
      <Route
        path="/employee/onboarding"
        element={
          <RoleGuard allowedRoles={['EMPLOYEE']}>
            <EmployeeOnboardingPage />
          </RoleGuard>
        }
      />
      <Route
        path="/employee/home"
        element={
          <RoleGuard allowedRoles={['EMPLOYEE']}>
            <EmployeeHomePage />
          </RoleGuard>
        }
      />
      <Route
        path="/employee/personal-info"
        element={
          <RoleGuard allowedRoles={['EMPLOYEE']}>
            <EmployeePersonalInfoPage />
          </RoleGuard>
        }
      />
      <Route
        path="/employee/visa-status"
        element={
          <RoleGuard allowedRoles={['EMPLOYEE']}>
            <VisaStatus />
          </RoleGuard>
        }
      />
      <Route
        path="/employee/housing"
        element={
          <RoleGuard allowedRoles={['EMPLOYEE']}>
            <Housing />
          </RoleGuard>
        }
      />

      {/* HR routes protected by AuthGuard and RoleGuard */}
      <Route
        path="/hr/dashboard"
        element={
          <RoleGuard allowedRoles={['HR']}>
            <HRDashboardPage />
          </RoleGuard>
        }
      />
      <Route
        path="/hr/employees"
        element={
          <RoleGuard allowedRoles={['HR']}>
            <HREmployeeProfilesPage />
          </RoleGuard>
        }
      />
      <Route
        path="/hr/visa"
        element={
          <RoleGuard allowedRoles={['HR']}>
            <HRVisaManagementPage />
          </RoleGuard>
        }
      />
      <Route
        path="/hr/hiring"
        element={
          <RoleGuard allowedRoles={['HR']}>
            <HRHiringManagementPage />
          </RoleGuard>
        }
      />
      <Route
        path="/hr/housing"
        element={
          <RoleGuard allowedRoles={['HR']}>
            <HRHouseManagementPage />
          </RoleGuard>
        }
      />

      {/* Catch-all route redirects to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
