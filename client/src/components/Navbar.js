import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import avatar from '../images/user.png';

function Navbar() {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear('accessToken');
    setAuthState({ ...authState, status: false });
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
      {!authState.status && (
        <>
          <Link className='nav-links' to='/login'>
            Login
          </Link>
          <Link className='nav-links' to='/register'>
            Register
          </Link>
        </>
      )}
      {authState.status && (
        <>
          <button className='nav-logout-button' onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
      {authState.status && (
        <Link className='profile-link' to='/profile' title={authState.userName}>
          <img id='avatar-link' src={avatar} alt={authState.userName} />
        </Link>
      )}
    </div>
  );
}

export default Navbar;
