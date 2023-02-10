import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Comment from '../components/Comment';
import CreateComment from './CreateComment';
function Post() {
  let { id } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:3001/posts/post/${id}`).then((response) => {
      setPost(response.data);
    });
  }, [id]);

  return (
    <div className='post-page'>
      <div className='single-post'>
        <h1>{post.title}</h1>
        <div id='post-content'>{post.content}</div>
        <div id='post-footer'> {post.author}</div>
      </div>
      <div className='comment-section'>
        <h2>Comments</h2>
        <div className='create-comment-wrapper'>
          <CreateComment id={id} />
        </div>
        <div className='comment-list'>
          <Comment id={id} />
        </div>
      </div>
    </div>
  );
}

export default Post;
