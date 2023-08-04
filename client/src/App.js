import './App.css';
import Home from './components/Home';
import CreatePost from './components/Posts/CreatePost';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Post from './components/Posts/Post';

import Login from './components/Login';
import Register from './components/Register';
import { AuthContext } from './Contexts/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Profile from './components/Profile';
import PageNotFound from './components/PageNotFound';

function App() {
  const [authState, setAuthState] = useState({
    userName: '',
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get('http://localhost:3001/auth/token-valid', {
        headers: {
          accessToken: JSON.parse(localStorage.getItem('User'))?.accessToken,
        },
      })
      .then((res) => {
        if (res.data.error) setAuthState({ ...authState, status: false });
        else
          setAuthState({
            ...authState,
            userName: res.data.user.userName,
            id: res.data.user.id,
            status: true,
          });
      });
  }, []);
  return (
    <div className='App'>
      <AuthContext.Provider
        value={{
          authState,
          setAuthState,
        }}
      >
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/createPost' element={<CreatePost />} />
            <Route exact path='/post/:id' element={<Post />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/profile/:id' element={<Profile />} />
            <Route exact path='*' element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
