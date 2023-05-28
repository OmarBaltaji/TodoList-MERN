import React, { useState, useEffect } from 'react'
import Header from '../common/Header';
import { ApolloCache, DefaultContext, MutationTuple, OperationVariables } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validatePassword, validateEmail, validateName } from '../../helpers/validations';

interface AuthData {
  email: string;
  password: string;
  fullName?: string;
}

interface Props {
  page: string;
  authData: AuthData;
  setAuthData: React.Dispatch<React.SetStateAction<AuthData>>; 
  formErrors: AuthData; 
  setFormErrors: React.Dispatch<React.SetStateAction<AuthData>>; 
  authMutation: any;
}

const Form: React.FC<Props> = ({ page, authData, setAuthData, formErrors, setFormErrors, authMutation }) => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
  const history = useHistory();

  useEffect(() => {
    // If all inputs are filled, check if one of the inputs contain an error. In case yes, then disable submit button
    if(Object.values(authData).every(input => input))
      setDisableSubmit(() => Object.values(formErrors).some(error => error !== ''));

    const isLoggedIn: string = localStorage.getItem('isLoggedIn') ?? '0';
    if (parseInt(isLoggedIn))
      history.push('/home');
  }, [formErrors, history]);

  const submitForm = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    const areAllFilled: boolean = Object.values(authData).every(data => data !== '');

    if(areAllFilled) {
      try {
        const { data } = await authMutation({ variables: { dto: authData } });
        const result: boolean = page === 'login' ? data.login.result : data.register.result;

        if(result) {
          if (page === 'login') {
            localStorage.setItem('isLoggedIn', '1');
            setAuthData(() => ({ email: '', password: '' }));
            history.push('/home');
          } else {
            toast.success('Registration Successful');
            setAuthData(() => ({ fullName: '', email: '', password: '' }));
    
            setTimeout(() => {
              history.push('/');
            }, 2000);
          } 
          setDisableSubmit(true);
        } else {
          toast.error("Something went wrong, please try again later");
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
    setAuthData((oldData: AuthData) => ({...oldData, [property]: value }));

    if (property === 'password' && value.length >= 8)
      validatePassword(value, setFormErrors);
  }

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>, property: string) => {
    const value: string = e.target.value;
    if (property === 'email')
      validateEmail(value, setFormErrors);
    else if (property === 'password')
      validatePassword(value, setFormErrors);
    else 
      validateName(value, setFormErrors);
  }

  return (
    <>
      <Header />
      <div className='col-md-12 pt-5 mt-5'>
        <div className='d-flex justify-content-center'>
          <div className='col-md-4'>
            <div className='card p-5 shadow-sm bg-body rounded row flex-column justify-content-center'>
              <form className='w-100'>
               {
                  page === 'register' && 
                  <div className="row mb-4">
                    <label htmlFor="fullName" className="col-sm-3 col-form-label">Full Name</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" id='fullName' value={authData.fullName} onBlur={(e) => onBlurHandler(e, 'name')} onChange={(e) => onChangeHandler(e, 'fullName')} />
                      {formErrors.fullName && <div className='text-danger mt-1'>{formErrors.fullName}</div>}
                    </div>
                  </div>
                }
                <div className="row mb-4">
                  <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9">
                    <input type="email" className="form-control" id='email' value={authData.email} onBlur={(e) => onBlurHandler(e, 'email')} onChange={(e) => onChangeHandler(e, 'email')} />
                    {formErrors.email && <div className='text-danger mt-1'>{formErrors.email}</div>}
                  </div>
                </div>
                <div className="row mb-5">
                  <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                  <div className="col-sm-9">
                    <input type="password" className="form-control" id='password' value={authData.password} onBlur={(e) => onBlurHandler(e, 'password')} onChange={(e) => onChangeHandler(e, 'password')} />
                    {formErrors.password && <div className='text-danger mt-1'>{formErrors.password}</div>}
                  </div>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    {
                      page === 'login' 
                      ? 
                      <div>Don't have an account? <Link to='/register'>Register</Link></div>
                      :
                      <div>Already have an account? <Link to='/'>Login</Link></div>
                    }
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

export default Form;