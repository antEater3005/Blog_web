import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

function Login() {
  const validationSchema = Yup.object().shape({
    userName: Yup.string().min(4).max(20).required('Username is required!'),
    Password: Yup.string().min(8).max(20).required('password is required!'),
  });
  const submit = (data, { resetForm }) => {
    axios.post('http://localhost:3001/auth/login', data).then((response) => {
      alert(response.data.message);
      resetForm();
    });
  };
  return (
    <div className='login-page'>
      <Formik
        initialValues={{
          userName: '',
          Password: '',
        }}
        onSubmit={submit}
        validationSchema={validationSchema}
      >
        <Form className='login-form'>
          <label>UserName:</label>
          <ErrorMessage
            className='error-message'
            name='userName'
            component={'span'}
          />
          <Field
            id='login-form-username'
            name='userName'
            placeholder='UserName'
          />
          <label id='password'>Password:</label>
          <ErrorMessage
            className='error-message'
            name='Password'
            component={'span'}
          />
          <Field
            id='login-form-password'
            name='Password'
            placeholder='Password'
            type='password'
          />
          <button type='submit'>Login</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
