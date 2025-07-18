import React, { useState } from 'react';
import { type Employee, type VisaStatus } from '../types/employeeTypes';
import VisaForm from './VisaForm';
import { deleteVisa } from '../services/employeeService';

type Props = {
  id: string;
  initVisas: VisaStatus[];
};

const VisaView: React.FC<Props> = ({id, initVisas}) => {
  const [editVisa, setEditVisa] = useState<boolean>(true);
  const [visas, setVisas] = useState<VisaStatus[]>(initVisas);
  const removeHandler = async (visaId: string) => {
    const employee : Employee = await deleteVisa(id, visaId);
    setVisas(employee.visaStatus);
  }
  return (
    <div className="card mt-3">
      <div className="card-body">
        <h4 className="card-title">Visa Status</h4>
        {editVisa?
          <button onClick={() => setEditVisa(false)}>Add Visa</button>
          :
          <button onClick={() => setEditVisa(true)}>Cancel</button>
        }
        <hr></hr>
        {editVisa ? 
            visas.map((visa, i) => (
            <div key={i} className="mb-2">
              <p><strong>Type:</strong> {visa.visaType}</p>
              <p><strong>Active:</strong> {visa.activeFlag ? "Yes" : "No"}</p>
              <p><strong>From:</strong> {visa.startDate} to {visa.endDate}</p>
              <p><strong>Last Updated:</strong> {visa.lastModificationDate}</p>
              <button onClick={() => removeHandler(visa.id)}>Remove</button>
              <hr ></hr>
            </div>
          )) :
          (
            <VisaForm id={id} />
          )
        }
      </div>
    </div>
  )
}

export default VisaView;