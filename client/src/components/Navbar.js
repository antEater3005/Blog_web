import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
function Navbar() {
const {authState}=useContext(AuthContext)

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
          </Link>{' '}
        </>
      )}
    </div>
  );
}

export default Navbar;
