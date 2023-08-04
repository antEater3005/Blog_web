import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import defaultAvatar from '../images/user.png';

function Navbar() {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear('User');
    setAuthState({ ...authState, status: false });
    navigate('/');
  };

  const image = JSON.parse(localStorage.getItem('User'))?.image;

  // console.log(authState);
  return (
    <div className='navbar'>
      <Link className='nav-links' to='/'>
        Home
      </Link>
      {authState.status && (
        <Link className='nav-links' to='/createPost'>
          Create Post
        </Link>
      )}
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
        <Link
          className='profile-link'
          to={`/profile/${authState.id}`}
          title={authState.userName}
        >
          <img
            id='avatar-link'
            src={authState.status ? image : defaultAvatar}
            alt={authState.userName}
          />
        </Link>
      )}
    </div>
  );
}

export default Navbar;
