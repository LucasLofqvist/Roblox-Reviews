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
    })

    const fetchUsers = async () => {
        try {
            const fetchedUsers = await FetchRouter("api/users");
            //All users, incl Moderators
            setAllUsers(fetchedUsers);
    
            //Only users with role User
            setUsers(allUsers.filter(user => user.role === "User"));

            //Only users with role Banned
            setBannedUsers(allUsers.filter(user => user.role === "Banned"));
        } catch (error) {
            console.error(error.message);
        }
    }

    return(
        <div className="admin-page">
            <ol className="list-of-users">
                {users.map(user => (
                    <li className="admin-users" key={user._id}>Username: {user.username}</li>
                ))}
            </ol>
            <ol className="list-of-banned-users">
                {bannedUsers.map(bannedUser => (
                    <li className="banned-users" key={bannedUser._id}>Username: {bannedUser.username}</li>
                ))}
            </ol>
        </div>
    )
}


export default AdminDashboard