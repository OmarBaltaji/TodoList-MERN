import { useMutation } from '@apollo/client';
import React from 'react'
import { useHistory } from 'react-router-dom';
import { LOGOUT } from '../../graphql/mutations';

const Header: React.FC = () => {
  const history = useHistory();
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const [logoutMutation, {}] = useMutation(LOGOUT);

  const logout = async () => {
    const { data : { logout: { result } } } = await logoutMutation();
    if(result) {
      history.push('/');
      localStorage.removeItem('isLoggedIn');    
    }
  }

  return (
    <nav className="navbar navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand">TodoList</span>
        {isLoggedIn && <button className="btn btn-danger" onClick={logout}>Logout</button>}
      </div>
    </nav>
  )
}

export default Header;