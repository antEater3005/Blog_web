// import React from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// function CreateComment({ id }) {
//   const initialValues = {
//     CommentBody: '',
//     PostId: id,
//   };
//   const validationSchema = Yup.object().shape({
//     CommentBody: Yup.string().required('CommentBody cannot be empty...'),
//     PostId: Yup.number().integer().required('PostId cannot be empty...'),
//   });

//   const onSubmit = (body) => {
//     axios.post('http://localhost:3001/comments', body).then((response) => {
//       console.log(response.data);
//     });
//   };
//   return (
//     <div className='create-comment'>
//       <Formik
//         initialValues={initialValues}
//         onSubmit={onSubmit}
//         validationSchema={validationSchema}
//       >
//         <Form className='comment-form'>
//           <label>Comment</label>
//           <ErrorMessage name='comment' component={'span'} />
//           <Field
//             id='input-comment'
//             name='comment'
//             placeholder='write comment...'
//           />
//           <button type='submit'>Comment</button>
//         </Form>
//       </Formik>
//     </div>
//   );
// }

// export default CreateComment;

import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function CreateComment({ id }) {
  const [comment, setComments] = useState(''); 
  const submit = () => {
    if (comment === '') {
      alert('Comment cannot be empty...');
      return;
    } 
    axios
      .post('http://localhost:3001/comments', {
        CommentBody: comment,
        PostId: id,
      })
      .then((response) => {
        window.location.reload(false);
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
      <button onClick={submit}>Comment</button>
    </div>
  );
}

export default CreateComment;
