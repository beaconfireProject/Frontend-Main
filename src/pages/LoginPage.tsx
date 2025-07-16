import React from 'react';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';

const LoginPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <LoginForm />
    </>
  );
};

export default LoginPage;
