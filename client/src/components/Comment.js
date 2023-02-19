import React, { useContext } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import deletePNG from '../images/delete.png';
import { AuthContext } from '../Contexts/AuthContext';
function Comment({ id }) {
  const [comments, setComments] = useState([]);
  const { authState } = useContext(AuthContext);
  useEffect(() => {
    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
      console.log();
    });
  }, [id]);

  const handleCommentDelete = (commentId) => {
    axios.delete(`http://localhost:3001/comments/${commentId}`).then((res) => {
      setComments(
        comments.filter((comment) => {
          return comment.id !== commentId;
        })
      );
      console.log(res.data);
    });
  };

  return (
    <div>
      {comments.map((comment) => {
        return (
          <div key={comment.id} className='comment-single'>
            <div className='comment-head-wrapper'>
              <div className='comment-username'>{comment.userName}</div>
              {authState.status && authState.userName === comment.userName && (
                <button
                  className='comment-delete-button'
                  onClick={(e) => {
                    handleCommentDelete(comment.id);
                  }}
                >
                  <img id='delete-comment' src={deletePNG} alt='' />
                </button>
              )}
            </div>
            <div className='comment-body'>{comment.CommentBody}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Comment;
