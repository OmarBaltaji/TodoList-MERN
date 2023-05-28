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
  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
  });
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [loginMutation, {}] = useMutation(LOGIN);
  const history = useHistory();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn && parseInt(isLoggedIn)) {
      history.push('/home');
    }
  }, []);

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
    const value = e.target.value;
    if(property === 'password') {
      if(value.length > 6) {
        setFormValid((oldData) => ({ ...oldData, password: true }));
        setDisableSubmit(() => !Object.values(formValid).every(input => input));
      } else {
        setFormValid((oldData) => ({ ...oldData, password: false }));
        setDisableSubmit(true);
      }
    }
    setLoginData((oldData) => ({...oldData, [property]: e.target.value }));
  }

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    validateEmail(e.target.value);
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (emailRegex.test(email)) {
      setFormValid(oldData => ({ ...oldData, email: true }));
      setDisableSubmit(() => !Object.values(formValid).every(input => input));
      console.log(disableSubmit, !Object.values(formValid).every(input => input));
    } else {
      setFormValid(oldData => ({ ...oldData, email: false }));
      setDisableSubmit(true);
      toast.error('Email not valid');
    }
  };

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
                    <input type="email" className="form-control" id='email' value={loginData.email} onBlur={onBlurHandler} onChange={(e) => onChangeHandler(e, 'email')} />
                  </div>
                </div>
                <div className="row mb-5">
                  <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                  <div className="col-sm-9">
                    <input type="password" className="form-control" id='password' value={loginData.password} onChange={(e) => onChangeHandler(e, 'password')} />
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