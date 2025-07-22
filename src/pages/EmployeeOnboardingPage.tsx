import React, { useState, useEffect } from 'react';
import OnboardingNavbar from '../components/OnboardingNavbar'; // Assuming this component exists
import axios from 'axios'; // Import plain axios
import { useToast } from '../hooks/useToast'; // Assuming you have this hook

// Define WorkAuthType for type safety
type WorkAuthType = 
  | 'Green Card' 
  | 'Citizen' 
  | 'H1-B' 
  | 'L2' 
  | 'F1(CPT/OPT)' 
  | 'H4' 
  | 'Other';

interface BackendContact {
  firstName: string;
  lastName: string;
  cellPhone: string;
  alternatePhone: string | null;
  email: string | null;
  relationship: string | null;
  type: string;
}

// Define the main form data interface
interface OnboardingFormData {
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
  avatarFile?: File | null; // File object for upload
  address: {
    addressLine1: string,
    addressLine2: string,
    city: string,
    state: string,
    zipCode: string
  }; // Required
  cellPhone?: string;
  workPhone?: string;
  email: string; // Prefilled and read-only
  ssn?: string;
  dob?: string;
  gender: string; // Required
  isCitizenOrPermanentResident: boolean | null; // Required
  workAuthType?: WorkAuthType | null;
  workAuthOtherDesc?: string;
  workAuthStartDate?: string;
  workAuthEndDate?: string;
  workAuthDocFile?: File | null; // File object for upload
  hasDriversLicense: boolean | null; // Required
  driversLicenseNumber?: string;
  driversLicenseExpiry?: string;
  driversLicenseDocFile?: File | null; // File object for upload
  referenceFirstName?: string;
  referenceLastName?: string;
  referencePhone?: string;
  referenceEmail?: string;
  referenceRelationship?: string;
  emergencyContacts: { // At least one required
    firstName: string; // Required
    lastName: string; // Required
    middleName?: string;
    phone: string; // Required
    email?: string;
    relationship?: string;
  }[];
}

const address = {
  street: '',
  unit: '',
  city: '',
  state: '',
  zipCode: ''
 }

// Default structure for a new emergency contact
const defaultEmergencyContact = {
  firstName: '',
  lastName: '',
  middleName: '',
  phone: '',
  email: '',
  relationship: '',
};

// Base URL for the Application Service (as provided)
const APPLICATION_SERVICE_BASE_URL = 'http://localhost:9000/api/application';

// Main EmployeeOnboardingPage component
const EmployeeOnboardingPage: React.FC<{ userEmail: string }> = ({ userEmail }) => {
  const { showToast } = useToast(); // Initialize toast hook

  // State to manage the current step of the onboarding process
  const [currentStep, setCurrentStep] = useState(1);

  // State to hold all form data
  const [formData, setFormData] = useState<OnboardingFormData>({
    firstName: '',
    lastName: '',
    middleName: '',
    preferredName: '',
    avatarFile: null,
    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
    },
    cellPhone: '',
    workPhone: '',
    email: "abc@gmail.com", // Prefilled with constant email as requested
    ssn: '',
    dob: '',
    gender: '',
    isCitizenOrPermanentResident: null,
    workAuthType: null,
    workAuthOtherDesc: '',
    workAuthStartDate: '',
    workAuthEndDate: '',
    workAuthDocFile: null,
    hasDriversLicense: null,
    driversLicenseNumber: '',
    driversLicenseExpiry: '',
    driversLicenseDocFile: null,
    referenceFirstName: '',
    referenceLastName: '',
    referencePhone: '',
    referenceEmail: '',
    referenceRelationship: '',
    emergencyContacts: [ { ...defaultEmergencyContact } ], // Initialize with one empty contact
  });

  // States to control conditional rendering of fields
  const [showWorkAuthOtherInput, setShowWorkAuthOtherInput] = useState(false);
  const [showWorkAuthDates, setShowWorkAuthDates] = useState(false);
  const [showDriversLicenseFields, setShowDriversLicenseFields] = useState(false);
  
  // State for submission feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccessMessage, setSubmissionSuccessMessage] = useState('');

  // Effect to manage visibility of work authorization fields based on selection
  useEffect(() => {
    if (formData.workAuthType === 'Other') {
      setShowWorkAuthOtherInput(true);
      setShowWorkAuthDates(true);
    } else if (
      formData.workAuthType &&
      ['H1-B', 'L2', 'F1(CPT/OPT)', 'H4'].includes(formData.workAuthType)
    ) {
      setShowWorkAuthOtherInput(false);
      setShowWorkAuthDates(true);
    } else {
      setShowWorkAuthOtherInput(false);
      setShowWorkAuthDates(false);
    }
  }, [formData.workAuthType]);

  // Effect to manage visibility of driver's license fields
  useEffect(() => {
    setShowDriversLicenseFields(!!formData.hasDriversLicense);
  }, [formData.hasDriversLicense]);

  // Generic handler for input changes (text, select, textarea)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type} = e.target;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      const checked = e.target.checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === 'addressLine1' || name === 'addressLine2' || name === 'city' || name === 'state' || name === 'zipCode') {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
     }
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handler for file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  // Handler for changes in emergency contact array
  const handleEmergencyContactChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const contacts = [...prev.emergencyContacts];
      contacts[index] = { ...contacts[index], [name]: value };
      return { ...prev, emergencyContacts: contacts };
    });
  };

  // Function to add a new emergency contact field set
  const addEmergencyContact = () => {
    setFormData((prev) => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, { ...defaultEmergencyContact }],
    }));
  };

  // Function to remove an emergency contact field set
  const removeEmergencyContact = (index: number) => {
    setFormData((prev) => {
      const contacts = [...prev.emergencyContacts];
      contacts.splice(index, 1);
      return { ...prev, emergencyContacts: contacts };
    });
  };

  // Function to navigate to the next step (TODO: Add validation here)
  const handleNext = () => {
    // Basic validation for current step (you'll need to expand this)
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.address || !formData.gender) {
        showToast('Please fill in all required fields for Personal Information.', 'danger');
        return;
      }
    } else if (currentStep === 2) {
      if (formData.isCitizenOrPermanentResident === null) {
        showToast('Please specify your citizenship/residency status.', 'danger');
        return;
      }
      if (formData.isCitizenOrPermanentResident === true) {
        if (!formData.workAuthType || !formData.workAuthStartDate || !formData.workAuthEndDate || !formData.workAuthDocFile) {
          showToast('Please provide all required details for your Green Card/Citizen status, including dates and document.', 'danger');
          return;
        }
      } else if (formData.isCitizenOrPermanentResident === false) {
        if (!formData.workAuthType) {
          showToast('Please select your work authorization type.', 'danger');
          return;
        }
        if (formData.workAuthType === 'Other' && !formData.workAuthOtherDesc) {
          showToast('Please specify your "Other" work authorization.', 'danger');
          return;
        }
        if (!formData.workAuthStartDate || !formData.workAuthEndDate || !formData.workAuthDocFile) {
          showToast('Please provide all required details for your work authorization, including dates and document.', 'danger');
          return;
        }
      }

      if (formData.hasDriversLicense === null) {
        showToast('Please indicate if you have a driver\'s license.', 'danger');
        return;
      }
      if (formData.hasDriversLicense === true) {
        if (!formData.driversLicenseNumber || !formData.driversLicenseExpiry || !formData.driversLicenseDocFile) {
          showToast('Please provide all required driver\'s license details and document.', 'danger');
          return;
        }
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  // Function to navigate to the previous step
  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Helper function to get JWT from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // Final submit handler for the entire form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation for the last step (you'll need to expand this)
    if (formData.emergencyContacts.length === 0 || 
        formData.emergencyContacts.some(contact => !contact.firstName || !contact.lastName || !contact.phone)) {
      showToast('Please provide at least one complete emergency contact.', 'danger');
      return;
    }

    setIsSubmitting(true);
    setSubmissionSuccessMessage(''); // Clear previous messages

    try {
      const token = getAuthToken();
      if (!token) {
        showToast('Authentication token not found. Please log in again.', 'danger');
        setIsSubmitting(false);
        return;
      }

      // 1. Prepare the payload for the POST request
      // Note: For file fields (avatar, workAuthDoc, driversLicenseDoc),
      // the backend example payload uses URLs. This implies files are uploaded
      // separately (e.g., to S3) and their URLs are passed here.
      // For this example, I'll use placeholder URLs or null if no file selected.

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        middleName: formData.middleName || null,
        preferredName: formData.preferredName || null,
        avatar: formData.avatarFile ? `https://example.com/avatars/${formData.avatarFile.name}` : null, // Placeholder URL
        address: { // Assuming currentAddress maps to a single address object
          addressLine1: formData.address.addressLine1, // This might need parsing if currentAddress is a single string
          addressLine2: formData.address.addressLine2, // No unit field in your form, assuming flat address string
          city: formData.address.city, // No city field in your form
          state: formData.address.state, // No state field in your form
          zipCode: formData.address.zipCode, // No zipCode field in your form
        },
        cellPhone: formData.cellPhone || null,
        workPhone: formData.workPhone || null,
        email: formData.email,
        gender: formData.gender,
        ssn: formData.ssn || null,
        dob: formData.dob || null,
        // startDate and endDate are for employment, not directly in onboarding form data provided,
        // but are in the example payload. Assuming they come from workAuth dates if applicable.
        startDate: formData.workAuthStartDate || null, // Mapping workAuthStartDate to startDate
        endDate: formData.workAuthEndDate || null, // Mapping workAuthEndDate to endDate
        visaStatus: (formData.isCitizenOrPermanentResident === false || formData.workAuthType === 'Green Card' || formData.workAuthType === 'Citizen') ? {
          visaType: formData.workAuthType === 'Other' ? formData.workAuthOtherDesc : formData.workAuthType,
          activeFlag: true, // Assuming active upon submission
          startDate: formData.workAuthStartDate || null,
          endDate: formData.workAuthEndDate || null,
          lastModificationDate: new Date().toISOString().split('T')[0], // Current date
        } : null,
        workDoc: formData.workAuthDocFile ? `https://example.com/docs/workEAD.jpg` : null, // Placeholder URL
        driverLicense: formData.hasDriversLicense ? {
          licenseNumber: formData.driversLicenseNumber,
          driverLicenseExpiration: formData.driversLicenseExpiry,
          licenseDoc: formData.driversLicenseDocFile ? `https://example.com/docs/driverlicense.jpg` : null, // Placeholder URL
        } : null,
        contact: formData.emergencyContacts.map(contact => ({
          firstName: contact.firstName,
          lastName: contact.lastName,
          cellPhone: contact.phone,
          alternatePhone: contact.middleName || null,
          email: contact.email || null,
          relationship: contact.relationship || null,
          type: "Emergency"
        }) as BackendContact // Explicitly cast emergency contacts to BackendContact
        ).concat(
          formData.referenceFirstName ? [{
            firstName: formData.referenceFirstName ?? '',
            lastName: formData.referenceLastName ?? '',
            cellPhone: formData.referencePhone ?? '', // Ensure this is also a string
            alternatePhone: null, // As per your comment, always null for reference alternatePhone
            email: formData.referenceEmail || null,
            relationship: formData.referenceRelationship || null,
            type: "Reference"
          } as BackendContact] : [] // Explicitly cast reference contact to BackendContact
        )
      };

      

      // 2. Make the POST request to create the onboarding application
      const createResponse = await axios.post(
        `${APPLICATION_SERVICE_BASE_URL}/onboarding`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Assuming the response contains the application ID
      const empId = createResponse.data?.data?.id; // Adjust based on actual API response structure
      
      const tk = localStorage.getItem("token");

      if (!empId) {
        throw new Error('Failed to get application ID after submission.');
      }

      if (tk) {
        localStorage.setItem(tk, empId);
      }

      // 3. Make the PATCH request to update the application status to "Completed"
      // await axios.patch(
      //   `${APPLICATION_SERVICE_BASE_URL}/onboarding/application/${applicationId}/Completed`,
      //   {}, // PATCH request body can be empty if status is in URL
      //   {
      //     headers: {
      //       'Authorization': `Bearer ${token}`
      //     }
      //   }
      // );

      setSubmissionSuccessMessage('Your onboarding application has been submitted successfully. Please wait for HR to review your application.');
      showToast('Onboarding application submitted!', 'success');

      // Optionally, clear the form or redirect after successful submission
      // setFormData({ ...initialFormData }); // You'd need to define initialFormData
      // navigate('/employee/status-check'); // Redirect to a status page
      
    } catch (error: any) {
      console.error('Onboarding submission failed:', error);
      let errorMessage = 'Failed to submit onboarding application.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      showToast(errorMessage, 'danger');
      setSubmissionSuccessMessage(''); // Clear success message on error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Onboarding Navbar component */}
      <OnboardingNavbar /> 
      <div className="container mt-4">
        <h2 className="mb-4 text-center">Employee Onboarding Application</h2>
        <div className="bg-white rounded shadow p-4">
          {isSubmitting ? (
            <div className="text-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Submitting your application, please wait...</p>
            </div>
          ) : submissionSuccessMessage ? (
            <div className="alert alert-success text-center p-4">
              <h4>{submissionSuccessMessage}</h4>
              <p className="mt-3">You will be notified via email once HR reviews your application.</p>
              {/* You might want to add a button to go to home/status page here */}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Bootstrap Accordion for steps */}
              <div className="accordion" id="onboardingAccordion">

                {/* Step 1: Personal Information */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className={`accordion-button ${currentStep !== 1 ? 'collapsed' : ''}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded={currentStep === 1}
                      aria-controls="collapseOne"
                      onClick={() => setCurrentStep(1)} // Allow clicking to jump to step
                    >
                      Step 1: Personal Information
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className={`accordion-collapse collapse ${currentStep === 1 ? 'show' : ''}`}
                    aria-labelledby="headingOne"
                    data-bs-parent="#onboardingAccordion"
                  >
                    <div className="accordion-body">
                      {/* Name Fields */}
                      <div className="mb-3">
                        <label className="form-label fw-bold">First Name *</label>
                        <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Last Name *</label>
                        <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Middle Name</label>
                        <input type="text" className="form-control" name="middleName" value={formData.middleName} onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Preferred Name</label>
                        <input type="text" className="form-control" name="preferredName" value={formData.preferredName} onChange={handleChange} />
                      </div>

                      {/* Avatar Upload */}
                      <div className="mb-3">
                        <label className="form-label">Avatar</label>
                        <input type="file" name="avatarFile" accept="image/*" onChange={handleFileChange} className="form-control" />
                        <small className="form-text text-muted">Optional. Default avatar will be used if none uploaded.</small>
                      </div>

                      {/* Address */}
                      <div className="mb-3">
                            <label className="form-label fw-bold">Current Address *</label><br />
                            <div className="mb-4">
                              Address Line 1: <input type="text" className="form-control" name='addressLine1' value={formData.address.addressLine1} onChange={handleChange} required />
                              Address Line 2: <input type="text" className="form-control" name='addressLine2' value={formData.address.addressLine2} onChange={handleChange} />
                              City: <input type="text" className="form-control" name='city' value={formData.address.city} onChange={handleChange} required />
                              State: <input type="text" className="form-control" name='state' value={formData.address.state} onChange={handleChange} required />
                              ZipCode: <input type="text" className="form-control" name='zipCode' value={formData.address.zipCode} onChange={handleChange} required />
                            </div>
                      </div>

                      {/* Phones */}
                      <div className="mb-3">
                        <label className="form-label">Cell Phone</label>
                        <input type="tel" className="form-control" name="cellPhone" value={formData.cellPhone} onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Work Phone</label>
                        <input type="tel" className="form-control" name="workPhone" value={formData.workPhone} onChange={handleChange} />
                      </div>

                      {/* Email (readonly) */}
                      <div className="mb-3">
                        <label className="form-label fw-bold">Email *</label>
                        <input type="email" className="form-control" name="email" value={formData.email} readOnly />
                      </div>

                      {/* SSN, DOB, Gender */}
                      <div className="mb-3">
                        <label className="form-label">SSN (last 4 digits only)</label>
                        <input type="text" className="form-control" name="ssn" value={formData.ssn} maxLength={4} onChange={handleChange} placeholder="Last 4 digits" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Date of Birth</label>
                        <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <select className="form-select" name="gender" value={formData.gender} onChange={handleChange} required>
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="I Prefer Not to Say">I Prefer Not to Say</option>
                        </select>
                      </div>

                      {/* Navigation buttons for Step 1 */}
                      <div className="d-flex justify-content-end mt-4">
                        <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2: Work Authorization & Driver's License */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className={`accordion-button ${currentStep !== 2 ? 'collapsed' : ''}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded={currentStep === 2}
                      aria-controls="collapseTwo"
                      onClick={() => setCurrentStep(2)}
                    >
                      Step 2: Work Authorization & Driver's License
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className={`accordion-collapse collapse ${currentStep === 2 ? 'show' : ''}`}
                    aria-labelledby="headingTwo"
                    data-bs-parent="#onboardingAccordion"
                  >
                    <div className="accordion-body">
                      {/* Citizenship/Work Authorization */}
                      <fieldset className="mb-3">
                        <legend className="fw-bold">Are you a citizen or permanent resident of the U.S.? *</legend>
                        <div className="form-check">
                          <input type="radio" className="form-check-input" name="isCitizenOrPermanentResident" value="true" checked={formData.isCitizenOrPermanentResident === true} onChange={() => setFormData((prev) => ({ ...prev, isCitizenOrPermanentResident: true, workAuthType: null }))} required />
                          <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check">
                          <input type="radio" className="form-check-input" name="isCitizenOrPermanentResident" value="false" checked={formData.isCitizenOrPermanentResident === false} onChange={() => setFormData((prev) => ({ ...prev, isCitizenOrPermanentResident: false }))} required />
                          <label className="form-check-label">No</label>
                        </div>
                      </fieldset>

                      {/* If citizen/permanent resident, select Green Card or Citizen */}
                      {formData.isCitizenOrPermanentResident === true && (
                        <div className="mb-3">
                          <label className="form-label">Select one: *</label>
                          <select className="form-select" name="workAuthType" value={formData.workAuthType || ''} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="Green Card">Green Card</option>
                            <option value="Citizen">Citizen</option>
                          </select>
                        </div>
                      )}

                      {/* If NOT citizen/permanent resident, select work authorization */}
                      {formData.isCitizenOrPermanentResident === false && (
                        <div className="mb-3">
                          <label className="form-label">What is your work authorization? *</label>
                          <select className="form-select" name="workAuthType" value={formData.workAuthType || ''} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="H1-B">H1-B</option>
                            <option value="L2">L2</option>
                            <option value="F1(CPT/OPT)">F1(CPT/OPT)</option>
                            <option value="H4">H4</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      )}

                      {/* If other, input box for specifying work authorization */}
                      {showWorkAuthOtherInput && (
                        <div className="mb-3">
                          <label className="form-label">Please specify work authorization *</label>
                          <input type="text" className="form-control" name="workAuthOtherDesc" value={formData.workAuthOtherDesc} onChange={handleChange} required />
                        </div>
                      )}

                      {/* Work authorization start/end dates */}
                      {(showWorkAuthDates || formData.isCitizenOrPermanentResident === true) && (
                        <>
                          <div className="mb-3">
                            <label className="form-label">Work Authorization Start Date *</label>
                            <input type="date" className="form-control" name="workAuthStartDate" value={formData.workAuthStartDate} onChange={handleChange} required />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Work Authorization Expiration Date *</label>
                            <input type="date" className="form-control" name="workAuthEndDate" value={formData.workAuthEndDate} onChange={handleChange} required />
                          </div>
                        </>
                      )}

                      {/* Upload work authorization document */}
                      {(showWorkAuthDates || formData.isCitizenOrPermanentResident === true) && (
                        <div className="mb-3">
                          <label className="form-label">Upload Work Authorization Document *</label>
                          <input type="file" name="workAuthDocFile" accept=".pdf,.jpg,.png" onChange={handleFileChange} className="form-control" required />
                        </div>
                      )}

                      {/* Driver's License */}
                      <fieldset className="mb-3">
                        <legend className="fw-bold">Do you have a driver's license? *</legend>
                        <div className="form-check">
                          <input type="radio" className="form-check-input" name="hasDriversLicense" value="true" checked={formData.hasDriversLicense === true} onChange={() => setFormData((prev) => ({ ...prev, hasDriversLicense: true }))} required />
                          <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check">
                          <input type="radio" className="form-check-input" name="hasDriversLicense" value="false" checked={formData.hasDriversLicense === false} onChange={() => setFormData((prev) => ({ ...prev, hasDriversLicense: false }))} required />
                          <label className="form-check-label">No</label>
                        </div>
                      </fieldset>

                      {/* Driver's license details if yes */}
                      {showDriversLicenseFields && (
                        <>
                          <div className="mb-3">
                            <label className="form-label">Driver's License Number *</label>
                            <input type="text" className="form-control" name="driversLicenseNumber" value={formData.driversLicenseNumber} onChange={handleChange} required />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Driver's License Expiration Date *</label>
                            <input type="date" className="form-control" name="driversLicenseExpiry" value={formData.driversLicenseExpiry} onChange={handleChange} required />
                          </div>
                          {/* <div className="mb-3">
                            <label className="form-label">Upload Driver's License Document *</label>
                            <input type="file" name="driversLicenseDocFile" accept=".pdf,.jpg,.png" onChange={handleFileChange} className="form-control" required />
                          </div> */}
                        </>
                      )}

                      {/* Navigation buttons for Step 2 */}
                      <div className="d-flex justify-content-between mt-4">
                        <button type="button" className="btn btn-secondary" onClick={handlePrevious}>Previous</button>
                        <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3: Reference & Emergency Contacts */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className={`accordion-button ${currentStep !== 3 ? 'collapsed' : ''}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded={currentStep === 3}
                      aria-controls="collapseThree"
                      onClick={() => setCurrentStep(3)}
                    >
                      Step 3: Reference & Emergency Contacts
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className={`accordion-collapse collapse ${currentStep === 3 ? 'show' : ''}`}
                    aria-labelledby="headingThree"
                    data-bs-parent="#onboardingAccordion"
                  >
                    <div className="accordion-body">
                      {/* Reference */}
                      <h5 className="mt-4">Reference</h5>
                      <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control" name="referenceFirstName" value={formData.referenceFirstName} onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-control" name="referenceLastName" value={formData.referenceLastName} onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input type="tel" className="form-control" name="referencePhone" value={formData.referencePhone} onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="referenceEmail" value={formData.referenceEmail} onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Relationship</label>
                        <input type="text" className="form-control" name="referenceRelationship" value={formData.referenceRelationship} onChange={handleChange} />
                      </div>

                      {/* Emergency Contacts */}
                      <h5 className="mt-4">Emergency Contacts (at least one required)</h5>
                      {formData.emergencyContacts.map((contact, idx) => (
                        <div key={idx} className="border p-3 mb-3 rounded">
                          <h6>Contact {idx + 1}</h6>
                          <div className="mb-2">
                            <label className="form-label">First Name *</label>
                            <input type="text" className="form-control" name="firstName" value={contact.firstName} onChange={(e) => handleEmergencyContactChange(idx, e)} required />
                          </div>
                          <div className="mb-2">
                            <label className="form-label">Last Name *</label>
                            <input type="text" className="form-control" name="lastName" value={contact.lastName} onChange={(e) => handleEmergencyContactChange(idx, e)} required />
                          </div>
                          <div className="mb-2">
                            <label className="form-label">Middle Name</label>
                            <input type="text" className="form-control" name="middleName" value={contact.middleName} onChange={(e) => handleEmergencyContactChange(idx, e)} />
                          </div>
                          <div className="mb-2">
                            <label className="form-label">Phone *</label>
                            <input type="tel" className="form-control" name="phone" value={contact.phone} onChange={(e) => handleEmergencyContactChange(idx, e)} required />
                          </div>
                          <div className="mb-2">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" value={contact.email} onChange={(e) => handleEmergencyContactChange(idx, e)} />
                          </div>
                          <div className="mb-2">
                            <label className="form-label">Relationship</label>
                            <input type="text" className="form-control" name="relationship" value={contact.relationship} onChange={(e) => handleEmergencyContactChange(idx, e)} />
                          </div>
                          {formData.emergencyContacts.length > 1 && (
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => removeEmergencyContact(idx)}>
                              Remove Contact
                            </button>
                          )}
                        </div>
                      ))}
                      <button type="button" className="btn btn-secondary mb-4" onClick={addEmergencyContact}>
                        Add Another Emergency Contact
                      </button>

                      {/* Navigation buttons for Step 3 and final submit */}
                      <div className="d-flex justify-content-between mt-4">
                        <button type="button" className="btn btn-secondary" onClick={handlePrevious}>Previous</button>
                        <button type="submit" className="btn btn-primary">
                          Submit Onboarding
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployeeOnboardingPage;
