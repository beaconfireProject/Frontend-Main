import React, { useState } from 'react';
import { type Address } from '../types/employeeTypes';
import { createAddress } from '../services/employeeService';

type Props = {
  id: string
};

const AddressForm: React.FC<Props> = ({ id }) => {
  const [address, setAddress] = useState<Address>({
    id: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value ? value : "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(address);
    createAddress(id, address);
    setAddress({
      id: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 border p-4 rounded bg-light">
      <div className="mb-3">
        <label className="form-label">Address Line 1</label>
        <input
          type="text"
          name="addressLine1"
          value={address.addressLine1}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Address Line 2</label>
        <input
          type="text"
          name="addressLine2"
          value={address.addressLine2}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label">City</label>
        <input
          type="text"
          name="city"
          value={address.city}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">State</label>
        <input
          type="text"
          name="state"
          value={address.state}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Zip Code</label>
        <input
          type="text"
          name="zipCode"
          value={address.zipCode}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add Address
      </button>
    </form>
  );
};

export default AddressForm;