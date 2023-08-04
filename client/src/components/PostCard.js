import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div
      className='postcard'
      onClick={() => {
        navigate(`/post/${post.id}`);
      }}
    >
      <div className='title'> {post.title}</div>
      <div className='body'> {post.content.slice(0, 150)}...</div>
      <div className='footer'>
        <div className='home-author'>{post.author}</div>
        <div className='likes-wrapper'>
          <div className='home-likes'>Likes:{post.likes}</div>
          <div className='home-dislikes'>Dislikes:{post.dislikes}</div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
