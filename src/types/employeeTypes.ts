export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  cellPhone: string;
  alternatePhone: string | null;
  email: string;
  relationship: string | null;
  type: string | null;
};

export type Address = {
  id: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  zipCode: string;
};

export type VisaStatus = {
  id: string;
  visaType: string;
  activeFlag: boolean;
  startDate: string;
  endDate: string;
  lastModificationDate: string | null;
};

export type PersonalDocument = {
  id: string;
  path: string;
  title: string;
  comment: string | null;
  createDate: string | null;
};

export type Employee = {
  id: string;
  userId: number;
  firstName: string;
  lastName: string;
  preferredName: string;
  email: string;
  cellPhone: string;
  alternatePhone: string;
  gender: string;
  ssn: string;
  dob: string;
  startDate: string;
  endDate: string;
  driverLicense: string;
  driverLicenseExpiration: string;
  houseId: number;
  status: string;
  title: string;
  comment: string;
  contact: Contact[];
  address: Address[];
  visaStatus: VisaStatus[];
  personalDocument: PersonalDocument[];
};

export interface DtoSuccess<T> {
  success: boolean;
  message: string;
  timestamp: string;
  data: T | null;
}

export interface DtoError {
  success: boolean;
  message: string;
  timestamp: string;
  status: string;
  error: string;
}