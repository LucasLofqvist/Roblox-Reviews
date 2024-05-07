import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import FetchRouter from '../components/FetchRouter';
import '../signup.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('User');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await FetchRouter('api/users', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    username,
                    birthYear: parseInt(birthYear), 
                    email, 
                    password, 
                    role 
                }),
            });
            
            if (data.success) {
                alert("Account created successfully!")
                navigate('/'); // Redirect to login page after successful signup
            } else {
                setError('Failed to create account');
            }
            } catch (err) {
                setError('Error creating account: '+ err.message);
            }
        };

    return (
        <div className="signup-container">
           <div className="signup-body">
            <h2>Sign Up</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>
                    Birth Year:
                    <input type="number" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <label>
                    Role:
                        <select value={role} onChange={(e) => setRole(e.target.value)} required>
                            <option value="User">User</option>
                            <option value="Moderator">Moderator</option>
                            <option value="Owner">Owner</option>
                        </select>
                </label>
                <button type="submit">Sign Up</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <p>Already have an account? <button onClick={() => navigate('/')}>Login</button></p>
            </div>
        </div>
    );
    }

    export default Signup;
