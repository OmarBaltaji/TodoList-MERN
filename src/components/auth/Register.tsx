import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../graphql/mutations';
import { ToastContainer, toast } from 'react-toastify';


const Register: React.FC = () => {
  const [registrationData, setRegistrationData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [registerMutation, {}] = useMutation(REGISTER);
  const history = useHistory();

  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn && parseInt(isLoggedIn)) {
      history.push('/home');
    }
  }, []);

  const submitForm = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    const areAllFilled = Object.values(registrationData).every(data => data !== '');

    if(areAllFilled) {
      const result = await registerMutation({ variables: { dto: registrationData } });
      if(result) {
        toast.success('Registration Successful');
        setRegistrationData(() => ({ fullName: '', email: '', password: '' }));

        setTimeout(() => {
          history.push('/');
        }, 2000);
      }
    } else {
      toast.error('All fields must be filled');
    }
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, property: string) => {
    setRegistrationData((oldData) => ({...oldData, [property]: e.target.value }));
  }

  return (
    <>
      <ToastContainer autoClose={3000} />
      <div className='col-md-12 mt-5'>
      <div className='d-flex justify-content-center'>
        <div>
          <h1 className="text-center mb-5">Welcome to your TodoList!</h1>
          <div className='card p-5 shadow-sm bg-body rounded row flex-column justify-content-center'>
            <form className='w-100'>
              <div className="row mb-4">
                <label htmlFor="fullName" className="col-sm-3 col-form-label">Full Name</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id='fullName' value={registrationData.fullName} onChange={(e) => onChangeHandler(e, 'fullName')} />
                </div>
              </div>
              <div className="row mb-4">
                <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id='email' value={registrationData.email} onChange={(e) => onChangeHandler(e, 'email')} />
                </div>
              </div>
              <div className="row mb-4">
                <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                <div className="col-sm-9">
                  <input type="password" className="form-control" id='password' value={registrationData.password} onChange={(e) => onChangeHandler(e, 'password')} />
                </div>
              </div>
              <div className='d-flex justify-content-between align-items-center'>
                  <div>Already have an account? <Link to='/'>Login</Link></div>
                  <button className="btn btn-primary btn py-2 px-4" onClick={submitForm}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Register;