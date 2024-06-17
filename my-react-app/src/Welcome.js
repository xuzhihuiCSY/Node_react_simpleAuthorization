import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    const userToken = localStorage.getItem('userToken');  
    if (!userName || !userToken) {
      navigate('/login'); 
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/login');
  };

  const userName = localStorage.getItem('userName'); 

  return (
    <div>
      <h1>Welcome, {userName}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Welcome;
