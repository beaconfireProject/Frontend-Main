import React, { useState } from 'react';
import { ToastContext } from '../context/ToastContext';

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'danger'>('success');
  const [visible, setVisible] = useState(false);

  const showToast = (msg: string, type: 'success' | 'danger' = 'success') => {
    setMessage(msg);
    setType(type);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && (
        <div
          className={`toast show position-fixed top-0 start-50 translate-middle-x mt-3 text-white bg-${type}`}
          role="alert"
        >
          <div className="toast-body">{message}</div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
