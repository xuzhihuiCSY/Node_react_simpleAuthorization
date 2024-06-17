import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation check
        if (!userData.username || !userData.email || !userData.password) {
            alert('All fields are required!');
            return;
        }

        try {
            // Sending a POST request to the server
            const response = await axios.post('http://localhost:3002/register', userData);
            console.log(response.data); // Logging the response from the server
            alert('User registered successfully!');
        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data : 'Server error');
            alert('Failed to register user: ' + (error.response ? error.response.data : 'Check server connection'));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
            </div>
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
