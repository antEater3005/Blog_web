import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Comment from './Comment';
import CreateComment from './CreateComment';
import deletePNG from '../../images/delete.png';
import { AuthContext } from '../../Contexts/AuthContext';

function Post() {
  let { id } = useParams();
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [post, setPost] = useState({});
  const [lColor, setLColor] = useState('#3d7aff00');
  const [dColor, setDColor] = useState('#3d7aff00');

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/post/${id}`).then((response) => {
      setPost(response.data);
    });
    axios
      .get(`http://localhost:3001/posts/reaction/${id}`, {
        headers: {
          accessToken: JSON.parse(localStorage.getItem('User'))?.accessToken,
        },
      })
      .then((res) => {
        if (res.data.error) return;
        if (res.data.like) {
          setLColor('#3877fff3');
        } else setDColor('#ff3838f3');
      });
  }, [id]);

  // console.log(JSON.parse(localStorage.getItem('User'))?.accessToken);

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
            accessToken: JSON.parse(localStorage.getItem('User'))?.accessToken,
          },
        }
      )
      .then((res) => {
        if (res.data.error) alert(res.data.error);
        else setPost(res.data);
      });
  };
  const handleDeletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/post/${id}`, {
        headers: {
          accessToken: JSON.parse(localStorage.getItem('User'))?.accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate('/');
      });
  };

  return (
    <div className='post-page'>
      <div className='single-post'>
        <div className='post-header'>
          <h1>{post.title}</h1>
          {authState.status && authState.userName === post.author && (
            <button
              onClick={() => {
                handleDeletePost(id);
              }}
            >
              <img src={deletePNG} alt='Delete_Post' />
            </button>
          )}
        </div>
        <div id='post-content'>{post.content}</div>
        <div id='post-footer'>
          <div className='post-author'>{post.author}</div>
          <div className='likes-wrapper'>
            <button
              disabled={!authState.status}
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
              disabled={!authState.status}
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
