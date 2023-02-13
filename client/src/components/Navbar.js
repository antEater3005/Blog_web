import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
function Navbar() {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear('accessToken');
    setAuthState(false);
    navigate('/');
  };
  return (
    <div className='navbar'>
      <Link className='nav-links' to='/'>
        Home
      </Link>
      <Link className='nav-links' to='/createPost'>
        Create Post
      </Link>
      {!authState && (
        <>
          <Link className='nav-links' to='/login'>
            Login
          </Link>
          <Link className='nav-links' to='/register'>
            Register
          </Link>
        </>
      )}
      {authState && (
        <>
          <button className='nav-logout-button' onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
      {authState && (
        <Link className='profile-link' to='/profile'>
          <img src='' alt='profile-pic' />
        </Link>
      )}
    </div>
  );
}

export default Navbar;
