import React from 'react';
import AppRoutes from './routes/AppRoutes';
import ToastProvider from './components/ToastProvider';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <AppRoutes />
    </ToastProvider>
  );
};

export default App;
