import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

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

  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var base64 = reader.result;
        // console.log('hello', base64);
        setImage(base64);
        // console.log(image);
      };
      reader.onerror = (error) => {
        console.log('Error', error);
      };
    }
  };
  // states
  const [image, setImage] = useState('');
  const [image_size_ok, set_image_size_ok] = useState(1);
  const [isCamera, setCamera] = useState(1);
  const initialValues = {
    userName: '',
    Password: '',
    ConfirmPassword: '',
    name: '',
    email: '',
  };
  //submit form for register
  const submit = (data, { resetForm }) => {
    axios
      .post('http://localhost:3001/auth/register', { data, image })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert(response.data.message);
          console.log(response.data);
        }
        navigate('/login');
      });
  };

  // store image from camera
  const webRef = useRef(null);
  const click_image = () => {
    setImage(webRef.current.getScreenshot());
    toggleCamera();
  };

  const toggleCamera = () => {
    setCamera(!isCamera);
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
          <div className='profile-pic-input'>
            {isCamera && (
              <input
                id='register-form-image'
                name='image'
                type='file'
                accept='image/*'
                onChange={(e) => {
                  encodeFileBase64(e.target.files[0]);
                  const fileSize = e.target.files[0].size;
                  // console.log(fileSize);
                  if (fileSize > 200000) {
                    alert('image should be less than 200kB');
                    set_image_size_ok(0);
                  } else {
                    set_image_size_ok(1);
                  }
                }}
              />
            )}

            <button
              type='button'
              id='camera-toggle-button'
              onClick={() => {
                toggleCamera();
              }}
            >
              {isCamera ? 'Camera' : 'Choose file'}
            </button>

            {!isCamera && (
              <div className='camera-click'>
                <button
                  type='button'
                  id='camera-click-button'
                  onClick={() => {
                    click_image();
                  }}
                >
                  click
                </button>
                <Webcam className='webCam' ref={webRef} />
              </div>
            )}
          </div>
          {image && isCamera && (
            <img id='show-profile-pic' src={image} alt='profile_pic' />
          )}
          <button
            type='submit'
            disabled={Formik.isSubmitting || !image_size_ok}
          >
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
