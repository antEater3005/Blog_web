import './App.css';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Post from './components/Post';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/createPost' element={<CreatePost />} />
          <Route exact path='/post/:id' element={<Post />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
