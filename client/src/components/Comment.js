import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
function Comment({ id }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id]);
  return (
    <div>
      {comments.map((comment) => {
        return (
          <div key={comment.id} className='comment-single'>
            <div className='comment-username'>{comment.userName}</div>
            <div className='comment-body'>{comment.CommentBody}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Comment;
