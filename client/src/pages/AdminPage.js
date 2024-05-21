import React, { useState, useEffect } from 'react';
import { FetchRouter, authFetchRouter } from '../components/FetchRouter';
import '../style/admin.css';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [bannedUsers, setBannedUsers] = useState([]);

    useEffect( () => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const allUsers = await authFetchRouter("api/users");
            setUsers(allUsers.filter(user => user.role === "User"));
            setBannedUsers(allUsers.filter(user => user.role === "Banned"));
            
        } catch (error) {
            console.error(error.message);
        }
    }

    const toggleSuspension = async (username) => {
        const response = await FetchRouter("api/users/toggleSuspension", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({targetUser: username})
        })

        console.log(response);
        fetchUsers();
        console.log(response.message);
    }

    return(
        <div className="admin-page">
            <div className="userlist-container">
                <h2>Users:</h2>
                <ol className="list-of-users">
                    {users.map(user => (
                        <li className="users" key={user.username}> {user.username} <button onClick={() => {toggleSuspension(user.username)}} className='ban-button'>BAN</button> </li>
                    ))}
                </ol>
            </div>
            
            <div className="banlist-container">
                <h2>Banned users:</h2>
                <ol className="list-of-banned-users">
                    {bannedUsers.map(bannedUser => (
                        <li className="banned-users" key={bannedUser.username}> {bannedUser.username} <button onClick={() => {toggleSuspension(bannedUser.username)}} className='unban-button'>UNBAN</button></li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default AdminDashboard