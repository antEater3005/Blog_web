import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';

window.Buffer = Buffer;

function Profile() {
  const [user, setUser] = useState('');
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/auth/user', {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((res) => {
        setUser(res.data);
      });
    axios
      .get('http://localhost:3001/posts/user-posts', {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((res) => {
        setNumberOfPosts(res.data);
      });
  }, []);
  return (
    <div className='profile-page'>
      <div className='profile-info'>
        <div className='user-info-fields'>
          <p>UserName : {user.userName}</p>
        </div>
        <div className='user-info-fields'>
          <p>Name : {user.name}</p>
        </div>
        <div className='user-info-fields'>
          <p>Date Of Joining : {user.join_date}</p>
        </div>
        <div className='user-info-fields'>
          <p>Number of Posts : {numberOfPosts}</p>
        </div>
      </div>
      <div className='profile-image'> 
      </div>
    </div>
  );
}

export default Profile;
