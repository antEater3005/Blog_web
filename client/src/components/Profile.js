import axios from 'axios';
import React, { useEffect, useState } from 'react';
import defaultAvatar from '../images/user.png';
import { useParams } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState('');
  const [avatar, setAvatar] = useState('');
  const { id } = useParams();

  // const get_image = (arrayBuffer) => {
  //   let typed_array = new Uint8Array(arrayBuffer);
  //   const stringChar = String.fromCharCode.apply(null, typed_array);
  //   let base64_string = window.btoa(stringChar);
  //   // console.log(base64_string)
  //   return base64_string;
  // };

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/user/${id}`, {}).then((res) => {
      // console.log(res.data.image.split(',')[1]);
      setAvatar(res.data.image.split(',')[1]);
      setUser(res.data);
    });
  }, []);
  return (
    <div className='profile-page'>
      <div className='profile-info'>
        <div className='user-info-fields'>
          <p>
            UserName : <b>{user.userName}</b>
          </p>
        </div>
        <div className='user-info-fields'>
          <p>
            Name : <b>{user.name}</b>{' '}
          </p>
        </div>
        <div className='user-info-fields'>
          <p>
            Registered : <b>{user.join_date}</b>
          </p>
        </div>
        <div className='user-info-fields'>
          <p>
            Number of Posts :<b> {user.numberOfPosts}</b>
          </p>
        </div>
      </div>
      <div className='profile-image'>
        <img
          id='profile-img'
          src={avatar ? `data:image/png;base64,${avatar}` : defaultAvatar}
          alt=''
        />
      </div>
    </div>
  );
}

export default Profile;
