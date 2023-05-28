import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { LOGOUT } from '../../graphql/mutations';
import { ToastContainer } from 'react-toastify';

const Header: React.FC = () => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') ?? '0');
  const [logoutMutation, {}] = useMutation(LOGOUT);

  const logout = async () => {
    const { data: { logout: { result } } } = await logoutMutation();
    if(result) {
      setIsLoggedIn('0');
      localStorage.removeItem('isLoggedIn');
      history.push('/');
    }
  }

  return (
    <>
      <ToastContainer autoClose={3000} />
      <nav className="navbar navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand">TodoList</span>
          {isLoggedIn !== '0' && <button className="btn btn-danger" onClick={logout}>Logout</button>}
        </div>
      </nav>
    </>
  )
}

export default Header;