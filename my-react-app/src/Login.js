import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/login', credentials);
      console.log(response.data);
      // Store the user's name and token in local storage
      localStorage.setItem('userName', response.data.username);
      localStorage.setItem('userToken', response.data.token);  // Assume your server sends a token
      alert('Login successful!');
      navigate('/welcome');  // Navigate to the welcome page after login
    } catch (error) {
      console.error(error);
      alert('Login failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={credentials.username} onChange={handleChange} placeholder="Username" required />
      <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
