import axiosInstance from '../utils/axiosInstance'; 
import {type Employee, type Document, type VisaStatus, type Contact, type Address, type DtoSuccess}  from '../types/employeeTypes'

export const getAllEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await axiosInstance.get<DtoSuccess<Employee[]>>('/api/employee');
    if(response && response.data && response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("retrieving all employees failed");
    }
  } catch (error: unknown) {
    console.log(error);
    throw new Error("retrieving all employees failed");
  }
};

export const getEmployee = async (id: string): Promise<Employee> => {
  try {
    const response = await axiosInstance.get<DtoSuccess<Employee>>(`/api/employee/${id}`);
    if(response && response.data && response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("retrieving employee failed");
    }
  } catch (error: unknown) {
    console.log(error);
    throw new Error("retrieving employee failed");
  }
};

export const getEmployeeByUserId = async (userId: number): Promise<Employee> => {
  try {
    const response = await axiosInstance.get<DtoSuccess<Employee>>(`/api/employee/userId/${userId}`);
    if(response && response.data && response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("retrieving employee by UserId failed");
    }
  } catch (error: unknown) {
    console.log(error);
    throw new Error("retrieving employee by UserId failed");
  }
};

export const getAllEmployeesByHouseId = async (houseId: number): Promise<Employee[]> => {
  try {
    const response = await axiosInstance.get<DtoSuccess<Employee[]>>(`/api/employee/houseId/${houseId}`);
    if(response && response.data && response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("retrieving all employees by House ID failed");
    }
  } catch (error: unknown) {
    console.log(error);
    throw new Error("retrieving all employees by House ID failed");
  }
};

export const patchEmployee = async (id: string, payload: any): Promise<Employee> => {
  try {
    const response = await axiosInstance.patch<DtoSuccess<Employee>>(`/api/employee/${id}`, payload);
    if(response && response.data && response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("patching employee failed");
    }
  } catch (error: unknown) {
    console.log(error);
    throw new Error("patching employee failed");
  }
};

export const deleteEmployee = async (id: string): Promise<string> => {
  try {
    const response = await axiosInstance.delete<DtoSuccess<string>>(`/api/employee/${id}`);
    if(response && response.data && response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("deleting employee failed");
    }
  } catch (error: unknown) {
    console.log(error);
    throw new Error("deleting employee failed");
  }
};

export const createEmployee = async (employee: Employee): Promise<string> => {
  try {
    const response = await axiosInstance.post<DtoSuccess<string>>(`/api/employee/`, employee);
    if(response && response.data && response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("creating employee failed");
    }
  } catch (error: unknown) {
    console.log(error);
    throw new Error("creating employee failed");
  }
};

export const createVisa = async (id: string, visa: VisaStatus): Promise<Employee> => {
  try {
    const response = await axiosInstance.post<DtoSuccess<Employee>>(`/api/employee/${id}/visa`, visa);
    if(response && response.data && response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("creating visa for employee failed");
    }
  } catch (error: unknown) {
    console.log(error);
    throw new Error("creating visa for employee failed");
  }
};

export const createDocument = async (id: string, document: Document): Promise<Employee> => {
  try {
    const response = await axiosInstance.post<DtoSuccess<Employee>>(`/api/employee/${id}/document`, document);
    if(response && response.data && response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("creating document for employee failed");
    }
  } catch (error: unknown) {
    console.log(error);
    throw new Error("creating document for employee failed");
  }
};

export const createAddress = async (id: string, address: Address): Promise<Employee> => {
  try {
    const response = await axiosInstance.post<DtoSuccess<Employee>>(`/api/employee/${id}/address`, address);
    if(response && response.data && response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("creating address for employee failed");
    }
  } catch (error: unknown) {
    console.log(error);
    throw new Error("creating address for employee failed");
  }
};

export const createContact = async (id: string, contact: Contact): Promise<Employee> => {
  try {
    const response = await axiosInstance.post<DtoSuccess<Employee>>(`/api/employee/${id}/contact`, contact);
    if(response && response.data && response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("creating contact for employee failed");
    }
  } catch (error: unknown) {
    console.log(error);
    throw new Error("creating contact for employee failed");
  }
};

export const deleteContact = async (id: string, contactId: string): Promise<Employee> => {
  try {
    const response = await axiosInstance.delete<DtoSuccess<Employee>>(`/api/employee/${id}/contact/${contactId}`);
    if(response && response.data && response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("deleting contact for employee failed");
    }
  } catch (error: unknown) {
    console.log(error);
    throw new Error("deleting contact for employee failed");
  }
};

export const deleteAddress = async (id: string, addressId: string): Promise<Employee> => {
  try {
    const response = await axiosInstance.delete<DtoSuccess<Employee>>(`/api/employee/${id}/address/${addressId}`);
    if(response && response.data && response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("deleting address for employee failed");
    }
  } catch (error: unknown) {
    console.log(error);
    throw new Error("deleting address for employee failed");
  }
};

export const deleteVisa = async (id: string, visaId: string): Promise<Employee> => {
  try {
    const response = await axiosInstance.delete<DtoSuccess<Employee>>(`/api/employee/${id}/visa/${visaId}`);
    if(response && response.data && response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("deleting contact for employee failed");
    }
  } catch (error: unknown) {
    console.log(error);
    throw new Error("deleting contact for employee failed");
  }
};

export const deleteDocument = async (id: string, docId: string): Promise<Employee> => {
  try {
    const response = await axiosInstance.delete<DtoSuccess<Employee>>(`/api/employee/${id}/document/${docId}`);
    if(response && response.data && response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("deleting contact for employee failed");
    }
  } catch (error: unknown) {
    console.log(error);
    throw new Error("deleting contact for employee failed");
  }
};