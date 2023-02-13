import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Comment from '../components/Comment';
import CreateComment from './CreateComment';
function Post() {
  let { id } = useParams();
  const [post, setPost] = useState({});
  const [reaction, setReaction] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/post/${id}`).then((response) => {
      setPost(response.data);
    });
  }, [id]);

  const handleLikeChange = (isLike) => {
    axios
      .post(
        `http://localhost:3001/posts/likes`,
        {
          isLike: isLike,
          postId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem('accessToken'),
          },
        }
      )
      .then((res) => {
        setReaction(res.data);
      });
  };

  return (
    <div className='post-page'>
      <div className='single-post'>
        <h1>{post.title}</h1>
        <div id='post-content'>{post.content}</div>
        <div id='post-footer'>
          <div className='post-author'>{post.author}</div>
          <div className='likes-wrapper'>
            <button
              onClick={(e) => {
                handleLikeChange(1);
              }}
            >
              Like
            </button>
            <div className='post-Likes'>{post.likes}</div>
            <button
              onClick={(e) => {
                handleLikeChange(0);
              }}
            >
              Dislike
            </button>
            <div className='post-dislikes'>{post.dislikes}</div>
          </div>
        </div>
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
