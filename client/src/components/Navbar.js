import React from 'react';
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <div className='navbar'>
      <Link className='nav-links' to='/'>Home</Link>
      <Link className='nav-links' to='/createPost'>Create Post</Link>
      <Link className='nav-links' to='/login'>Login</Link>
      <Link className='nav-links' to='/register'>Register</Link>
    </div>
  );
}

export default Navbar;
