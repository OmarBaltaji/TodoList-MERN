import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LOGIN } from '../../graphql/mutations';
import Header from '../common/Header';

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [loginMutation, {}] = useMutation(LOGIN);
  const history = useHistory();

  useEffect(() => {
    // If all inputs are filled, check if one of the inputs contain an error. In case yes, then disable submit button
    if(Object.values(loginData).every(input => input))
      setDisableSubmit(() => Object.values(formErrors).some(error => error !== ''));

    const isLoggedIn = localStorage.getItem('isLoggedIn') ?? '0';
    if (parseInt(isLoggedIn))
      history.push('/home');
  }, [formErrors]);

  const submitForm = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    const areAllFilled = Object.values(loginData).every(data => data !== '');

    if(areAllFilled) {
      try {
        const { data: { login: { result } } } = await loginMutation({ variables: { dto: loginData } });
        if(result) {
          localStorage.setItem('isLoggedIn', '1');
          setLoginData(() => ({ email: '', password: '' }));
          history.push('/home');
        }
      } catch (error) {
        toast.error(error.graphQLErrors[0].message);
      }
    } else {
      toast.error('All fields must be filled');
    }
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, property: string) => {
    const value: string = e.target.value;
    setLoginData((oldData) => ({...oldData, [property]: value }));

    if (property === 'password' && value.length > 6)
      validatePassword(value);

  }

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>, property: string) => {
    const value: string = e.target.value;
    if (property === 'email')
      validateEmail(value);
    else 
      validatePassword(value);
  }

  const validateEmail = (email: string) => {
    const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (emailRegex.test(email))
      setFormErrors(oldData => ({ ...oldData, email: '' }));
    else
      setFormErrors(oldData => ({ ...oldData, email: 'Email not valid' }));
  };

  const validatePassword = (password: string) => {
    if (password.length > 6)
      setFormErrors((oldData) => ({ ...oldData, password: '' }));
    else
      setFormErrors((oldData) => ({ ...oldData, password: 'Password should not be empty and at least composed of 6 characters' }));
  }

  return (
    <>
    <Header />
      <div className='col-md-12 mt-5'>
        <div className='d-flex justify-content-center'>
          <div className='col-md-4'>
            <div className='card p-5 shadow-sm bg-body rounded row flex-column justify-content-center'>
              <form className='w-100'>
                <div className="row mb-4">
                  <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9">
                    <input type="email" className="form-control" id='email' value={loginData.email} onBlur={(e) => onBlurHandler(e, 'email')} onChange={(e) => onChangeHandler(e, 'email')} />
                    {formErrors.email && <div className='text-danger mt-1'>{formErrors.email}</div>}
                  </div>
                </div>
                <div className="row mb-5">
                  <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                  <div className="col-sm-9">
                    <input type="password" className="form-control" id='password' value={loginData.password} onBlur={(e) => onBlurHandler(e, 'password')} onChange={(e) => onChangeHandler(e, 'password')} />
                    {formErrors.password && <div className='text-danger mt-1'>{formErrors.password}</div>}
                  </div>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>Don't have an account? <Link to='/register'>Register</Link></div>
                    <button className="btn btn-primary btn py-2 px-4" onClick={submitForm} disabled={disableSubmit}>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;