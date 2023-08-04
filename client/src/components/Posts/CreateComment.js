// import React from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// function CreateComment({ id }) {
//   const initialValues = {
//     comment: '',
//   };
//   const validationSchema = Yup.object().shape({
//     CommentBody: Yup.string().required('CommentBody cannot be empty...'),
//     PostId: Yup.number().integer().required('PostId cannot be empty...'),
//   });

//   const onSubmit = (body) => {
//     console.log(body);
//     axios
//       .post(
//         'http://localhost:3001/comments',
//         { ...body, PostId: id },
//         {
//           headers: {
//             accessToken: JSON.parse(localStorage.getItem('User'))?.accessToken,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//       });
//   };
//   return (
//     <div className='create-comment'>
//       <Formik
//         initialValues={initialValues}
//         onSubmit={onSubmit}
//         validationSchema={validationSchema}
//       >
//         <Form className='form'>
//           <ErrorMessage name='comment' component={'span'} />
//           <Field
//             id='input-comment'
//             name='comment'
//             placeholder='write comment...'
//             as='textarea'
//           />
//           <button type='submit'>Comment</button>
//         </Form>
//       </Formik>
//     </div>
//   );
// }

// export default CreateComment;

import React, { useContext } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Contexts/AuthContext';

function CreateComment({ id }) {
  const [comment, setComments] = useState('');
  const userId = JSON.parse(localStorage.getItem('User'))?.id;

  const { authState } = useContext(AuthContext);

  const submit = () => {
    if (comment === '') {
      alert('Comment cannot be empty...');
      return;
    }
    axios
      .post(
        'http://localhost:3001/comments',
        {
          CommentBody: comment,
          PostId: id,
          userId: userId,
        },
        {
          headers: {
            accessToken: JSON.parse(localStorage.getItem('User'))?.accessToken,
          },
        }
      )
      .then((response) => {
        if (response.data.error) alert(response.data.error);
        else window.location.reload(false);
      });
  };

  return (
    <div className='create-comment'>
      <textarea
        id='input-comment'
        type='text'
        name='comment'
        placeholder='write your comment...'
        onChange={(e) => {
          setComments(e.target.value);
        }}
      />
      <button disabled={!authState.status} onClick={submit}>
        Comment
      </button>
    </div>
  );
}

export default CreateComment;
