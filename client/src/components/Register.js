import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

function Login() {
  const validationSchema = Yup.object().shape({
    userName: Yup.string().min(4).max(20).required('Username is required!'),
    Password: Yup.string().min(8).max(20).required('Password is required!'),
    ConfirmPassword: Yup.string().when('Password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('Password')],
        'Password and Confirm Password should be same!'
      ),
    }),
  });
  const submit = (data, { resetForm }) => {
    axios.post('http://localhost:3001/auth/register', data).then((response) => {
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
          ConfirmPassword: '',
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
            className='login-form-password'
            name='Password'
            placeholder='Password'
            type='password'
          />
          <label id='password'>Confirm Password:</label>
          <ErrorMessage
            className='error-message'
            name='ConfirmPassword'
            component={'span'}
          />
          <Field
            className='login-form-password'
            name='ConfirmPassword'
            placeholder='Confirm Password'
            type='password'
          />
          <button type='submit'>Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
