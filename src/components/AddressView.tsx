import React, { useState } from 'react';
import { type Employee, type Address } from '../types/employeeTypes';
import AddressForm from './AddressForm'
import { deleteAddress } from '../services/employeeService';

type Props = {
  id: string;
  initAddress: Address[];
};

const AddressView: React.FC<Props> = ({id, initAddress}) => {
  const [edit, setEdit] = useState<boolean>(true);
  const [addresses, setAddresses] = useState<Address[]>(initAddress);
  const removeHandler = async (docId: string) => {
    const employee : Employee = await deleteAddress(id, docId);
    setAddresses(employee.address);
  }
  return (
    <div className="card mt-3">
      <div className="card-body">
        <h4 className="card-title">Addresss</h4>
        {edit ?
          <button onClick={() => setEdit(false)}>Add Address</button>
          :
          <button onClick={() => setEdit(true)}>Cancel</button>
        }
        <hr></hr>
        {edit ? 
          addresses.map((addr, i) => (
            <div key={i}>
              <p>{addr.addressLine1}, {addr.addressLine2}</p>
              <p>{addr.city}, {addr.state} {addr.zipCode}</p>
              <button onClick={() => removeHandler(addr.id)}>Remove</button>
              <hr ></hr>
            </div>
            )
          ) :
          (
            <AddressForm id={id} />
          )
        }
      </div>
    </div>
  )
}

export default AddressView;