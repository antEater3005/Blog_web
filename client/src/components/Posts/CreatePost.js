import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
function CreatePost() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const initialValues = {
    title: '',
    content: '',
    likes: 0,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Body is required'),
  });

  useEffect(() => {
    if (!authState.status) navigate('/');
  }, []);

  const onSubmit = (data) => {
    axios
      .post('http://localhost:3001/posts', data, {
        headers: {
          accessToken: JSON.parse(localStorage.getItem('User'))?.accessToken,
        },
      })
      .then((res) => {
        if (res.data.error) alert(res.data.error);
        else {
          alert('Post created successfully');
          navigate('/');
        }
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
          <Field
            id='inputCreatePost'
            name='content'
            placeholder='Body'
            as='textarea'
          />
          <button type='submit'>Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
