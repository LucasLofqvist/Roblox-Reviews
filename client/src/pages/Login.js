import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(username, password);
            alert("You are now logged in and enjoy!");
            return
        } catch (err) {
            setError('Failed to login: ' + err.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-body">
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>
                    <button type="submit">Login</button>
                    {error && <p>{error}</p>}
                </form>
                <p>Not yet have an account? <button className='loginPage' onClick={() => navigate('/signup')}>Sign Up</button></p>
            </div>
        </div>
    );
}   

export default Login;