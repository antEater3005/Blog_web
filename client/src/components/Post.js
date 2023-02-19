import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Comment from '../components/Comment';
import CreateComment from './CreateComment';
function Post() {
  let { id } = useParams();
  const [post, setPost] = useState({});
  const [reaction, setReaction] = useState(-1);
  const [lColor, setLColor] = useState('#3d7aff00');
  const [dColor, setDColor] = useState('#3d7aff00');

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/post/${id}`).then((response) => {
      setPost(response.data);
    });
    axios
      .get(`http://localhost:3001/posts/reaction/${id}`, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((res) => {
        if (res.data.error) return;
        if (res.data.like) {
          setLColor('#3877fff3');
        } else setDColor('#ff3838f3');
        setReaction(res.data.like);
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
        if (res.data.error) alert(res.data.error);
        else setPost(res.data);
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
              style={{ backgroundColor: { lColor } }}
              className='reaction-button'
              onClick={(e) => {
                handleLikeChange(1);
              }}
            >
              <img
                className='reaction-img'
                src='https://www.freeiconspng.com/uploads/facebook-like-icon--3.png'
                alt='Like'
              />
              {post.likes}
            </button>
            <button
              className='reaction-button'
              style={{ dColor }}
              onClick={(e) => {
                handleLikeChange(0);
              }}
            >
              <img
                className='reaction-img'
                src='https://www.freeiconspng.com/uploads/youtube-dislike-facebook-thumbs-down-not-like-png-16.png'
                alt='dislike'
              />
              {post.dislikes}
            </button>
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
