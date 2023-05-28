import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { LOGIN } from '../../graphql/mutations';
import Form from './Form';

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [loginMutation, {}] = useMutation(LOGIN);

  return (
    <Form page='login' authData={loginData} setAuthData={setLoginData} formErrors={formErrors} setFormErrors={setFormErrors} authMutation={loginMutation} />
  )
}

export default Login;