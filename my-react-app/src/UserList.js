import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3002/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                alert('Failed to fetch users');
            });
    }, []);

    return (
        <div>
            <h1>Registered Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
