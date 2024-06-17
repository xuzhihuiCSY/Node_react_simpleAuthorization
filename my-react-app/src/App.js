import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import UserList from './UserList';
import Welcome from './Welcome';  // Import the Welcome component

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/users">Users</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/welcome" element={<Welcome />} />  {/* Add route for Welcome page */}
          <Route path="/" element={<h1>Welcome to the User Management App</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
