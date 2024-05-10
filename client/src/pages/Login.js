import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FetchRouter } from '../components/FetchRouter';
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
            const response = await FetchRouter(`api/users/login`, {  // Assuming 'login' endpoint exists
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.token) {
                localStorage.setItem('token', response.token);
                console.log(response.token); 
                console.log('Navigate to home'); 
                alert("You are now login and enjoy!")
                navigate('/');
                login(); // Redirect to homepage or dashboard as needed
            } else {
                setError(response.message || 'Invalid username or password');  // Assuming error message is in response.message
            }
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

