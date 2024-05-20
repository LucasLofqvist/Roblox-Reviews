import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FetchRouter, authFetchRouter } from '../components/FetchRouter';
import '../style/admin.css';

const AdminDashboard = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [bannedUsers, setBannedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {
        //Fetch all users and update user-hooks
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const fetchedUsers = await FetchRouter("api/users");
            //All users, incl Moderators
            setAllUsers(fetchedUsers);
    
            //Only users with role User
            setUsers(allUsers.filter(user => user.role === "User"));

            //Only users with role Banned
            setBannedUsers(allUsers.filter(user => user.role === "Banned"));
            console.log(bannedUsers);
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