import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FetchRouter, authFetchRouter } from '../components/FetchRouter';
import '../style/admin.css';

const AdminDashboard = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {
  
})



}

export default AdminDashboard