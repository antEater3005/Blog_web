import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function CreatePost() {
  const navigate = useNavigate();
  const initialValues = {
    title: '',
    content: '',
    author: '',
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Body is required'),
    author: Yup.string().min(3).max(20).required('Author is required'),
  });

  const onSubmit = (data) => {
    axios.post('http://localhost:3001/posts', data).then((res) => {
      alert('Post created successfully');
      navigate('/');
    });
  };
  return (
    <div className='create-post'>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className='form'>
          <label>Title:</label>
          <ErrorMessage name='title' component='span' />
          <Field id='inputCreatePost' name='title' placeholder='Title' />
          <label>Body:</label>
          <ErrorMessage name='content' component='span' />
          <Field id='inputCreatePost' name='content' placeholder='Body' />
          <label>Author:</label>
          <ErrorMessage name='author' component='span' />
          <Field id='inputCreatePost' name='author' placeholder='Author' />
          <button type='submit'>Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;