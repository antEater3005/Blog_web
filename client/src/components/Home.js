import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PostCard from './PostCard';
function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/posts').then((response) => {
      setListOfPosts(response.data);
    });
  }, []);
  return (
    <div className='posts'>
      {listOfPosts.map((value, key) => {
        return <PostCard post={value} key={key} />;
      })}
    </div>
  );
}

export default Home;
