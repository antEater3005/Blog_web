import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(4).max(20).required('Name is required!'),
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
  const initialValues = {
    userName: '',
    Password: '',
    ConfirmPassword: '',
    name: '',
    email: '',
    image: '',
  };
  const submit = (data, { resetForm }) => {
    axios.post('http://localhost:3001/auth/register', data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
        navigate('/login');
      } else {
        alert(response.data.message);
        console.log(response.data);
      }
      resetForm();
    });
  };
  return (
    <div className='login-page'>
      <Formik
        onSubmit={submit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form className='login-form'>
          <label>Name:</label>
          <ErrorMessage
            className='error-message'
            name='name'
            component={'span'}
          />
          <Field id='login-form-name' name='name' placeholder='Name' />
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
          <label id='login-form-email'>E-mail:</label>
          <Field
            id='register-form-email'
            name='email'
            type='email'
            placeholder='Brad@xyz.com'
          />
          <label id='register-form-image'>Profile Pic:</label>
          <Field
            id='register-form-image'
            name='image'
            type='file'
            accept='image/*'
            // onChange={(e) => {
            //   console.log(e.values.image)
            // }}
          />
          <button type='submit' disabled={Formik.isSubmitting}>
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
