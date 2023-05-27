import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { LOGIN } from '../../graphql/mutations';

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
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
      const { data: { login: { result } } } = await loginMutation({ variables: { dto: loginData } });
      console.log(result);
      if(result) {
        localStorage.setItem('isLoggedIn', '1');
        setLoginData(() => ({ email: '', password: '' }));
        history.push('/home');
      }
    } else {
      toast.error('All fields must be filled');
    }
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, property: string) => {
    setLoginData((oldData) => ({...oldData, [property]: e.target.value }));
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
                  <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" id='email' value={loginData.email} onChange={(e) => onChangeHandler(e, 'email')} />
                  </div>
                </div>
                <div className="row mb-4">
                  <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                  <div className="col-sm-9">
                    <input type="password" className="form-control" id='password' value={loginData.password} onChange={(e) => onChangeHandler(e, 'password')} />
                  </div>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>Don't have an account? <Link to='/register'>Register</Link></div>
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

export default Login;