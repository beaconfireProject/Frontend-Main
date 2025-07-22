// import type { Application } from '../types/applicationTypes';
import type { DtoSuccess, Employee } from '../types/employeeTypes';
import axiosInstance from '../utils/axiosInstance';

interface OnboardingStatusResponse {
  status: 'APPROVED' | 'PENDING' | 'REJECTED' | string;
}

export const getOnboardingStatus = async () => {
  // Uncomment when backend is ready
  // const response = await axiosInstance.get<OnboardingStatusResponse>('/api/onboarding/status');
  // return response.data;

  // Mock response for now
  return {
    success: true,
    message: 'Status fetched successfully',
    data: {
      status: 'PENDING', // or 'PENDING', 'REJECTED'
    },
    timestamp: new Date().toISOString(),
  };
};

export type Data = {}

export type Comment = {
  comment: string;
}

export type Status = {
  status: string;
}

export type Application = {
  id: number;
  employeeId: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  comment: string;
  applicationType: string;
}

export type Document = {
  id: number;
  employeeId: string;
  type: string;
  isRequired: boolean;
  path: string;
  description: string;
  title: string
}

export type ApplicationDetail = {
  applicationWorkFlow: Application;
  employee: Employee;
  digitalDocuments: Document[];
}

export type ApplicationRequest = Omit<Application, "id">;
export const getAllONgoingApplications = async (): Promise<Application[]> => {
  try {
    const response = await axiosInstance.get<DtoSuccess<Application[]>>('/api/application/onboarding/applications');
    if (response && response.data && response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("retrieving all ongoing applications failed");
    }
  } catch (error: unknown) {
    console.log(error);
    throw new Error("retrieving all ongoing applications failed");
  }
};

export const getApplicationDetailById = async (applicationId: number): Promise<ApplicationDetail> => { 
  try { 
    const response = await axiosInstance.get<DtoSuccess<ApplicationDetail>>(`/api/application/onboarding/application/${applicationId}`);
    if (response && response.data && response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("retrieving employee by UserId failed");
    }
  } catch (error: unknown) {
    console.log(error);
    throw new Error("retrieving application detail by ApplicationId failed");
  }
}

export const updateStatus = async (applicationId: number, status: string, comment: string): Promise<Data> => { 
  try {
    const response = await axiosInstance.patch<DtoSuccess<Data>>(`/api/application/onboarding/application/${applicationId}/${status}`, { comment: comment });
    if (response && response.data && response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("retrieving employee by UserId failed");
    }
  } catch (error: unknown) {
    console.log(error);
    throw new Error("retrieving application detail by ApplicationId failed");
  }
}

export const getStatus = async (empId: string): Promise<Status> => {
  try {
    const response = await axiosInstance.get<DtoSuccess<Status>>(`api/application/onboarding/status/${empId}`);
    if (response && response.data && response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("retrieving employee by UserId failed");
    }
  } catch (error: unknown) {
    console.log(error);
    throw new Error("retrieving application detail by ApplicationId failed");
  }
};