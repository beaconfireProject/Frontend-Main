import React from 'react';
import RegisterForm from '../components/RegisterForm';
import Navbar from '../components/Navbar';

const RegisterPage: React.FC = () => {
    return (
    <>
      <Navbar />
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
