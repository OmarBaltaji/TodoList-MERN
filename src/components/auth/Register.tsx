import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../graphql/mutations';
import Form from './Form';

interface AuthData {
  fullName?: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [registrationData, setRegistrationData] = useState<AuthData>({
    fullName: '',
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState<AuthData>({
    fullName: '',
    email: '',
    password: '',
  });
  const [registerMutation, {}] = useMutation(REGISTER);

  return (
    <Form page='register' authData={registrationData} setAuthData={setRegistrationData} formErrors={formErrors} setFormErrors={setFormErrors} authMutation={registerMutation} />
  )
}

export default Register;